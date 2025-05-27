// src/main/java/dev/renting/delegations/ImageService.java
package dev.renting.delegations; // Asegúrate de que el paquete sea el correcto

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Endpoint
@AnonymousAllowed // Permite que este endpoint sea accesible sin autenticación. Ajusta si necesitas seguridad.
public class ImageService {

    // Define la ruta base donde se encuentran tus imágenes locales
    // Vaadin sirve el contenido de 'META-INF/resources' directamente.
    // Para acceder desde el frontend, solo necesitamos la ruta relativa al contexto.
    private static final String IMAGE_BASE_PATH_RESOURCES = "src/main/resources/META-INF/resources/images";
    private static final String IMAGE_WEB_PATH = "/images/"; // Ruta URL para acceder desde el navegador

    /**
     * Retorna una lista de URLs relativas para todas las imágenes encontradas
     * en la carpeta local de recursos.
     *
     * @return Una lista de cadenas, donde cada cadena es la URL de una imagen.
     */
    public List<String> getCarImageUrls() {
        Path imageDirectory = Paths.get(IMAGE_BASE_PATH_RESOURCES);
        if (!Files.exists(imageDirectory) || !Files.isDirectory(imageDirectory)) {
            System.err.println("Directorio de imágenes no encontrado o no es un directorio: " + imageDirectory.toAbsolutePath());
            return List.of(); // Retorna una lista vacía si el directorio no existe
        }

        try (Stream<Path> walk = Files.walk(imageDirectory)) {
            return walk
                    .filter(Files::isRegularFile)
                    .map(Path::getFileName) // Obtiene solo el nombre del archivo
                    .map(Path::toString) // Convierte a String
                    .filter(name -> name.toLowerCase().endsWith(".jpg") ||
                            name.toLowerCase().endsWith(".jpeg") ||
                            name.toLowerCase().endsWith(".png") ||
                            name.toLowerCase().endsWith(".webp")
                            name.toLowerCase().endsWith(".gif")) // Filtra por extensiones de imagen
                    .map(name -> IMAGE_WEB_PATH + name) // Construye la URL pública
                    .collect(Collectors.toList());
        } catch (IOException e) {
            System.err.println("Error al leer imágenes del directorio: " + e.getMessage());
            return List.of();
        }
    }
}