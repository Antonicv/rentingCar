import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { DelegationEndpoint } from 'Frontend/generated/endpoints';
import Car from 'Frontend/generated/dev/renting/delegations/Car';
import { Button } from '@vaadin/react-components/Button';
import { useNavigate } from 'react-router-dom';
// Asegúrate de importar el nuevo endpoint que crearemos para las imágenes locales
import { ImageService } from 'Frontend/generated/endpoints'; // Asumiendo que llamarás a tu nuevo servicio ImageService

export const config: ViewConfig = {
  menu: { order: 6, icon: 'line-awesome/svg/car-side-solid.svg' },
  title: 'Book a car',
};

// Define un tipo para las fotos locales si es necesario
interface LocalCarImage {
  model: string;
  color?: string; // Opcional, si tus fotos locales no siempre tienen color en el nombre
  url: string;
}

export default function ListCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [localImages, setLocalImages] = useState<LocalCarImage[]>([]); // Estado para almacenar las imágenes locales
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Función asíncrona para cargar datos
    const fetchData = async () => {
      try {
        // Cargar coches de la API
        const apiCars = await DelegationEndpoint.getAllCars();
        const safeApiCars = (apiCars ?? []).filter(
          (car): car is Car =>
            !!car &&
            typeof car.delegationId === 'string' &&
            typeof car.operation === 'string'
        );
        setCars(safeApiCars);

        // Cargar imágenes locales
        const images = await ImageService.getCarImageUrls(); // Llamada al nuevo endpoint
        setLocalImages(images.map(url => {
            // Puedes parsear el modelo y color del nombre de archivo si sigues una convención
            const parts = url.split('/').pop()?.split('.')[0].split('_') ?? [];
            return {
                model: parts[0] || '',
                color: parts[1] || undefined,
                url: url
            };
        }));
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setCars([]);
        setLocalImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBook = async (car: Car) => {
    const userId = "USER#001";
    try {
      const idHashBookingCar = await generateBookingHash({
        make: car.make ?? '',
        model: car.model ?? '',
        userId
      });
      navigate(`/listCars/bookingCar/${idHashBookingCar}`, { state: { car } });
    } catch (error) {
      console.error('Error generating booking hash:', error);
      alert('Failed to start booking process');
    }
  };

  async function generateBookingHash(data: {
    make: string;
    model: string;
    userId: string;
  }): Promise<string> {
    const encoder = new TextEncoder();
    const dateString = new Date().toISOString().split('T')[0];
    const stringToHash = `${data.make}-${data.model}-${dateString}-${data.userId}`;
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      encoder.encode(stringToHash)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function isCarWithMakeAndModel(car: Car): car is Car & { make: string; model: string } {
    return typeof car.make === 'string' && typeof car.model === 'string';
  }

  // Función para obtener la URL de la imagen
  const getCarImageUrl = (car: Car) => {
    // Prioriza las imágenes locales
    const localImage = localImages.find(img =>
        img.model.toLowerCase() === car.model?.toLowerCase() &&
        (!img.color || img.color.toLowerCase() === car.color?.toLowerCase()) // Compara color si existe en la local
    );

    if (localImage) {
        return localImage.url;
    }

    // Si no hay imagen local, usa la API
    // Asegúrate de que car.color no sea undefined antes de usarlo
    const colorParam = car.color ? `&paintId=${encodeURIComponent(car.color)}` : '';
    return `https://cdn.imagin.studio/getimage?customer=img&make=${encodeURIComponent(car.make ?? '')}&modelFamily=${encodeURIComponent(car.model?.split(' ')[0] ?? '')}${colorParam}&zoomType=fullscreen`;
  };

  if (loading) {
    return <div>Loading cars...</div>;
  }

  if (cars.length === 0 && localImages.length === 0) {
    return <div>No cars available.</div>;
  }

  // Combina los coches de la API con un "pseudo-coche" para cada imagen local que no tenga un equivalente en la API
  const combinedCars = [...cars];

  localImages.forEach(localImg => {
    const isApiCar = cars.some(car =>
      car.model?.toLowerCase() === localImg.model.toLowerCase() &&
      (!localImg.color || car.color?.toLowerCase() === localImg.color.toLowerCase())
    );

    if (!isApiCar) {
      // Crea un objeto Car simulado para las imágenes locales que no están en la API
      // Asegúrate de que las propiedades coincidan con el tipo Car, aunque sean valores predeterminados
      combinedCars.push({
        delegationId: `local-${localImg.model}-${localImg.color || 'default'}`, // ID único para la foto local
        make: "Local", // O un valor más descriptivo si puedes extraerlo
        model: localImg.model,
        color: localImg.color || 'Various', // Usa el color si está disponible, sino 'Various'
        year: 0, // Valor por defecto
        price: 0, // Valor por defecto
        rented: false, // Por defecto, las fotos locales no están "reservadas"
        operation: 'local' // Para identificar que es una foto local
      } as Car); // Cast a Car, ya que estamos creando un objeto que simula un Car
    }
  });


  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      {combinedCars
        .filter(isCarWithMakeAndModel)
        .map(car => (
          <div
            key={`${car.delegationId}-${car.operation}`}
            style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              width: '320px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.5rem',
              background: '#fff'
            }}
          >
            <img
              src={getCarImageUrl(car)} // Usa la nueva función para obtener la URL
              alt={`${car.make} ${car.model}`}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/300x180?text=Car+Not+Found';
              }}
            />
            <h3>
              {car.make} {car.model}
            </h3>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              Year: <strong>{car.year === 0 ? 'N/A' : car.year}</strong>
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              Color: <strong>{car.color === 'Various' ? 'N/A' : car.color}</strong>
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              Price: <strong>{car.price === 0 ? 'N/A' : `${car.price} €`}</strong>
            </div>
            <div style={{ marginBottom: '1rem', color: car.rented ? '#d33' : '#090' }}>
              {car.rented ? 'Rented' : 'Available'}
            </div>
            <Button
              theme="primary"
              disabled={car.rented || car.operation === 'local'} // Las fotos locales no son "reservables"
              onClick={() => handleBook(car)}
              style={{ width: '100%' }}
            >
              BOOK
            </Button>
          </div>
        ))
      }
    </div>
  );
}