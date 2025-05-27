import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { DelegationEndpoint, ImageEndpoint } from 'Frontend/generated/endpoints';
import Car from 'Frontend/generated/dev/renting/delegations/Car';
import { Button } from '@vaadin/react-components/Button';
import { useNavigate } from 'react-router-dom';

export const config: ViewConfig = {
  menu: { order: 6, icon: 'line-awesome/svg/car-side-solid.svg' },
  title: 'Book a car',
};

interface LocalCarImage {
  make: string;
  model: string;
  url: string;
  isClassic: boolean;
}

export default function ListCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [localImages, setLocalImages] = useState<LocalCarImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVintageMode, setIsVintageMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load cars from API
        const apiCars = await DelegationEndpoint.getAllCars();
        const safeApiCars = (apiCars ?? []).filter(
          (car): car is Car =>
            !!car &&
            typeof car.delegationId === 'string' &&
            typeof car.operation === 'string'
        );
        setCars(safeApiCars);

        // Fetch image filenames from ImageEndpoint
        const imageFilenames = await ImageEndpoint.getCarImageFilenames();
        const classicCars = imageFilenames.map(filename => {
          // Parse Marca_Modelo.webp (e.g., Citroen_Dyane.webp)
          const [make, model] = filename.replace('.webp', '').split('_');
          return {
            make: make || 'Unknown',
            model: model || 'Unknown',
            url: `/images/${filename}`,
            isClassic: true
          };
        });

        setLocalImages(classicCars);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setCars([]);
        setLocalImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Check for vintage mode and update state
    const checkVintageMode = () => {
      setIsVintageMode(document.documentElement.classList.contains('vintage-mode'));
    };

    checkVintageMode();
    const observer = new MutationObserver(checkVintageMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
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

  const getCarImageUrl = (car: Car) => {
    // Check for local classic car image
    const localImage = localImages.find(img =>
      img.make.toLowerCase() === car.make?.toLowerCase() &&
      img.model.toLowerCase() === car.model?.toLowerCase()
    );

    if (localImage) {
      return localImage.url;
    }

    // Use API for non-classic cars
    const colorParam = car.color ? `&paintId=${encodeURIComponent(car.color)}` : '';
    return `https://cdn.imagin.studio/getimage?customer=img&make=${encodeURIComponent(car.make ?? '')}&modelFamily=${encodeURIComponent(car.model?.split(' ')[0] ?? '')}${colorParam}&zoomType=fullscreen`;
  };

  if (loading) {
    return <div>Loading cars...</div>;
  }

  if (cars.length === 0 && localImages.length === 0) {
    return <div>No cars available.</div>;
  }

  // Combine and filter cars based on mode
  const combinedCars = isVintageMode
    ? localImages.map(img => ({
        delegationId: `local-${img.make}-${img.model}`,
        make: img.make,
        model: img.model,
        color: 'Various',
        year: 0,
        price: 0,
        rented: false,
        operation: 'classic'
      } as Car))
    : cars.filter(car => !localImages.some(img =>
        img.make.toLowerCase() === car.make?.toLowerCase() &&
        img.model.toLowerCase() === car.model?.toLowerCase()
      ));

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
              src={getCarImageUrl(car)}
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
              {car.make} {car.model} {car.operation === 'classic' ? '(Classic)' : ''}
            </h3>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              Year: <strong>{car.year === 0 ? 'N/A' : car.year}</strong>
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              Color: <strong>{car.color === 'Various' ? 'N/A' : car.color}</strong>
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              Price: <strong>{car.price === 0 ? 'N/A' : `${car.price} ${car.operation === 'classic' ? 'Pts' : '€'}`}</strong>
            </div>
            <div style={{ marginBottom: '1rem', color: car.rented ? '#d33' : '#090' }}>
              {car.rented ? 'Rented' : 'Available'}
            </div>
            <Button
              theme="primary"
              disabled={car.rented || car.operation === 'classic'}
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