
# Rental car Viuda de Agapito e Hijas

## User Stories:

### Como cliente, quiero poder seleccionar una delegación donde quiero recoger el coche para poder ver qué vehículos están disponibles en esa ubicación.

- El sistema debe mostrar un **campo** para que el usuario introduzca o **seleccione la delegación de recogida**.
- El sistema debe proporcionar una forma clara de seleccionar la delegación (ej. autocompletado, **lista desplegable**).
- Al seleccionar una delegación, el sistema debe prepararse para la siguiente acción del usuario (**selección de fechas**).

### Como cliente, quiero poder seleccionar una fecha de recogida y una fecha de devolución para poder ver qué vehículos están disponibles en esas fechas.

- El sistema debe mostrar un **campo** para que el usuario introduzca o seleccione la **fecha de recogida**.
- El sistema debe mostrar un **campo** para que el usuario introduzca o seleccione la **fecha de devolución**.
- El sistema debe **validar** que la **fecha de recogida es anterior a la fecha de devolución**.
- El sistema debe proporcionar una forma clara de seleccionar las fechas (ej. **calendario emergente**).
- Al seleccionar las fechas, el sistema debe prepararse para la siguiente acción del usuario (**selección de vehículos**).

### Como cliente, quiero hacer clic en un botón de "Buscar" después de seleccionar la delegación y las fechas para ver una lista de los vehículos disponibles.

- El sistema debe mostrar un **botón de "Buscar"** que el usuario pueda hacer clic después de seleccionar la delegación y las fechas.
- Al hacer clic en el botón, el sistema debe buscar los **vehículos disponibles** en la delegación seleccionada **para las fechas seleccionadas**.
- El sistema debe mostrar una lista de vehículos disponibles con **información relevante** (ej. marca, modelo, precio).
- El sistema debe permitir al usuario seleccionar un vehículo de la lista para proceder a la reserva.

## Modelo de datos:

### Consideraciones específicas para DynamoDB:

- **Clave Primaria**: Cada tabla en DynamoDB necesita una clave primaria, que puede ser una clave de partición simple o una clave de partición compuesta (clave de partición y clave de ordenación). Esto es fundamental para las consultas eficientes.
- **Índices**: Para realizar consultas eficientes que no se basen en la clave primaria, necesitamos definir índices secundarios (índices globales o locales).
- **Relaciones**: DynamoDB no tiene joins como en SQL. Las relaciones se gestionan a través de referencias y, a menudo, implican múltiples consultas o el uso de técnicas como la desnormalización (integrar datos relacionados en un mismo documento).

### Tablas:

#### 1. **Delegaciones**

- **Clave Primaria**: `id_delegacion` (String) - Clave de partición.
- **Atributos**:
    - `nombre` (String)
    - `direccion` (String)
    - `ciudad` (String)
    - `codigo_postal` (String)
    - `telefono` (String)
    - `email` (String)
    - `horario_apertura` (String)
    - `horario_cierre` (String)

#### 2. **Vehiculos**

- **Clave Primaria**: `id_vehiculo` (String) - Clave de partición.
- **Índice Global (GS1) por delegacion_id**:
    - **Clave de Partición**: `delegacion_id` (String)
- **Atributos**:
    - `modelo` (String)
    - `marca` (String)
    - `matricula` (String)
    - `categoria` (String)
    - `precio_por_dia` (Number)
    - `delegacion_id` (String) - Atributo para el índice global.
    - `disponibilidad` (Boolean) - Indica si el vehículo está disponible o no.

#### 3. **Disponibilidad**

- **Clave Primaria Compuesta**:
    - **Clave de Partición**: `id_vehiculo_delegacion` (String) - Combinación de `id_vehiculo` e `id_delegacion` (ej. vehiculo_abc123#delegacion_bcn).
    - **Clave de Ordenación**: `fecha_inicio` (String) - Formato ISO 8601 (YYYY-MM-DD).
- **Índice Global (GS1) por delegacion_fecha**:
    - **Clave de Partición**: `delegacion_id` (String)
    - **Clave de Ordenación**: `fecha_inicio` (String)
- **Atributos**:
    - `fecha_fin` (String) - Formato ISO 8601 (YYYY-MM-DD).
    - `estado` (String)

#### 4. **Reservas**

- **Clave Primaria Compuesta**:
    - **Clave de Partición**: `id_reserva` (String) - Identificador único de la reserva.
    - **Clave de Ordenación**: `fecha_inicio` (String) - Fecha de inicio de la reserva (formato ISO 8601: YYYY-MM-DD).
- **Índice Global (GS1) por cliente_id**:
    - **Clave de Partición**: `cliente_id` (String) - Identificador del cliente que realizó la reserva.
    - **Clave de Ordenación**: `fecha_inicio` (String).
- **Índice Global (GS2) por vehiculo_id_fecha_fin**:
    - **Clave de Partición**: `id_vehiculo` (String) - Identificador del vehículo reservado.
    - **Clave de Ordenación**: `fecha_fin` (String) - Fecha de fin de la reserva (formato ISO 8601: YYYY-MM-DD).
- **Atributos**:
    - `id_vehiculo` (String) - Referencia al vehículo reservado.
    - `id_delegacion_recogida` (String) - Referencia a la delegación de recogida.
    - `id_delegacion_devolucion` (String) - Referencia a la delegación de devolución (podría ser la misma).
    - `cliente_id` (String) - Referencia al cliente que realizó la reserva.
    - `fecha_fin` (String) - Fecha de fin de la reserva (formato ISO 8601: YYYY-MM-DD).
    - `precio_total` (Number) - Precio total de la reserva.
    - `estado_reserva` (String) - Estado de la reserva (ej. "Confirmada", "Cancelada", "En curso", "Finalizada").
    - `fecha_creacion` (String) - Fecha y hora de creación de la reserva (formato ISO 8601 con hora).

#### 5. **Users**

- **Clave Primaria**: `id_cliente` (String) - Identificador único del cliente. Podría ser un UUID generado por la aplicación o un identificador único proporcionado por un sistema de autenticación.
- **Atributos**:
    - `nombre` (String)
    - `apellido` (String)
    - `email` (String) - Podría ser útil añadir un índice secundario global para buscar clientes por correo electrónico si es una necesidad común.
    - `telefono` (String)
    - `direccion` (String)
    - `ciudad` (String)
    - `codigo_postal` (String)
    - `fecha_registro` (String) - Fecha y hora de registro del cliente (formato ISO 8601 con hora).
- **Índice Global (Opcional)**:
    - **Índice Global (GS1) por email**:
        - **Clave de Partición**: `email` (String)
- **Relación con la tabla Reservas**:
    - En la tabla Reservas, el atributo `cliente_id` actuará como una clave foránea lógica, referenciando el `id_cliente` de la tabla Clientes.

## "Relaciones" entre tablas:

### 1. **Delegaciones y Vehiculos**

- **Implementación**: En la tabla Vehiculos, el atributo `delegacion_id` referencia el `id_delegacion` de la tabla Delegaciones. Esto nos permite saber en qué delegación se encuentra un vehículo. Utilizamos un Índice Global (GS1) en la tabla Vehiculos con `delegacion_id` como clave de partición para poder consultar eficientemente todos los vehículos de una delegación específica.

### 2. **Vehiculos y Disponibilidad**

- **Implementación**: En la tabla Disponibilidad, el atributo `id_vehiculo` referencia el `id_vehiculo` de la tabla Vehiculos, y `id_delegacion` referencia el `id_delegacion` de la tabla Delegaciones. La clave primaria compuesta de `id_vehiculo_delegacion` y `fecha_inicio` nos permite identificar la disponibilidad específica de un vehículo en una delegación en un momento dado.

### 3. **Reservas y Users**

- **Implementación**: En la tabla Reservas, el atributo `cliente_id` referencia el `id_cliente` de la tabla Clientes. Utilizamos un Índice Global (GS1) en la tabla Reservas con `cliente_id` como clave de partición para poder consultar todas las reservas realizadas por un cliente.

### 4. **Reservas y Vehiculos**

- **Implementación**: En la tabla Reservas, el atributo `id_vehiculo` referencia el `id_vehiculo` de la tabla Vehiculos. Utilizamos un Índice Global (GS2) en la tabla Reservas con `id_vehiculo` como clave de partición para facilitar la consulta de todas las reservas de un vehículo específico.

### 5. **Reservas y Delegaciones**

- **Implementación**: La tabla Reservas tiene los atributos `id_delegacion_recogida` e `id_delegacion_devolucion`, que referencian el `id_delegacion` de la tabla Delegaciones.

## Data Flow:

