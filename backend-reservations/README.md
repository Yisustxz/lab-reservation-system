# Backend-Reservations

Microservicio dedicado a la gestión de reservaciones del sistema de reservas de laboratorio.

## Importante

Las entidades de TypeORM se encuentran en `backend/src/entities/`. Este microservicio utiliza PostgreSQL y modelos de datos propios para la lógica de negocio.

## Descripción

Este microservicio maneja toda la lógica relacionada con las reservaciones:

- Creación y gestión de reservaciones
- Validación de disponibilidad
- Consultas por usuario, computadora, fecha y estado
- Verificación de conflictos de horarios

## Base de Datos

- **PostgreSQL** (compartida con el backend principal)
- **Puerto**: 5432
- **Base de datos**: mydb

### Estructura de la base de datos

La tabla `reservations` contiene:

- `id`: Identificador único
- `user_id`: ID del usuario (FK a users)
- `computer_id`: ID de la computadora (FK a computers)
- `fecha`: Fecha de la reservación
- `hora`: Hora de la reservación
- `duracion`: Duración en horas
- `estado`: Estado de la reservación (pendiente, confirmada, completada, cancelada)
- `created_at`: Fecha de creación
- `updated_at`: Fecha de actualización

## Endpoints

### Reservaciones

- `GET /api/reservations` - Obtener todas las reservaciones
- `GET /api/reservations/details` - Obtener reservaciones con detalles de usuario y computadora
- `GET /api/reservations/:id` - Obtener reservación por ID
- `GET /api/reservations/computer/:computerId` - Obtener reservaciones por computadora
- `GET /api/reservations/user/:userId` - Obtener reservaciones por usuario
- `GET /api/reservations/status/:status` - Obtener reservaciones por estado
- `GET /api/reservations/date-range/:startDate/:endDate` - Obtener reservaciones por rango de fechas
- `POST /api/reservations` - Crear nueva reservación
- `PUT /api/reservations/:id` - Actualizar reservación
- `DELETE /api/reservations/:id` - Eliminar reservación
- `POST /api/reservations/check-availability` - Verificar disponibilidad

### Health Check

- `GET /health` - Verificar estado del servicio

## Variables de Entorno

```env
PORT=3003
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=admin
DB_NAME=mydb
```

## Instalación y Ejecución

### Desarrollo

```bash
cd backend-reservations
npm install
npm run dev
```

### Producción

```bash
cd backend-reservations
npm install
npm run build
npm start
```

## Características Especiales

- **Validación de disponibilidad**: Verifica automáticamente si una computadora está disponible antes de crear/actualizar reservaciones
- **Consultas avanzadas**: Permite filtrar por múltiples criterios (usuario, computadora, fecha, estado)
- **Gestión de estados**: Maneja el ciclo de vida completo de las reservaciones
- **Validación de datos**: Utiliza Joi para validar los datos de entrada
- **Manejo de errores**: Respuestas consistentes y manejo robusto de errores

## Arquitectura

```
backend-reservations/
├── src/
│   ├── index.ts          # Servidor principal
│   ├── routes.ts         # Definición de rutas
│   ├── models.ts         # Modelos de datos y lógica CRUD
│   ├── types.ts          # Tipos e interfaces
│   └── database.ts       # Configuración de base de datos
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

Este microservicio está diseñado para manejar todas las operaciones relacionadas con reservaciones de manera independiente, proporcionando una API RESTful completa y robusta.
