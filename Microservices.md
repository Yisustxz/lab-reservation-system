# Arquitectura de Microservicios

Sistema de reservas de laboratorios con arquitectura de microservicios.

## Servicios

### 1. Backend Principal (NestJS) - Puerto 3000

**Ubicación**: `backend/`
**Tecnología**: NestJS + TypeORM + PostgreSQL

#### Responsabilidades:

- Gestión de entidades TypeORM
- Creación automática de tablas
- Health checks básicos

#### Entidades:

- `User` (usuarios)
- `Lab` (laboratorios)
- `Computer` (computadoras)
- `Reservation` (reservas)

#### Endpoints:

- `GET /` - Hello World
- `GET /health` - Health check
- `GET /ping` - Ping

### 2. Backend-persons (Express) - Puerto 3002

**Ubicación**: `backend-persons/`
**Tecnología**: Express + PostgreSQL + Joi

#### Responsabilidades:

- CRUD completo de usuarios
- Validación de datos
- Gestión de autenticación

#### Endpoints:

- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario
- `GET /health` - Health check
- `GET /ping` - Ping

### 3. Backend-computers (Express) - Puerto 3004

**Ubicación**: `backend-computers/`
**Tecnología**: Express + PostgreSQL + Joi

#### Responsabilidades:

- CRUD de laboratorios
- CRUD de computadoras
- Consultas de computadoras por laboratorio

#### Endpoints:

##### Labs

- `GET /api/labs` - Obtener todos los laboratorios
- `GET /api/labs/:id` - Obtener laboratorio por ID
- `POST /api/labs` - Crear nuevo laboratorio
- `PUT /api/labs/:id` - Actualizar laboratorio
- `DELETE /api/labs/:id` - Eliminar laboratorio

##### Computers

- `GET /api/computers` - Obtener todas las computadoras
- `GET /api/computers/:id` - Obtener computadora por ID
- `GET /api/labs/:labId/computers` - Obtener computadoras de un laboratorio
- `POST /api/computers` - Crear nueva computadora
- `PUT /api/computers/:id` - Actualizar computadora
- `DELETE /api/computers/:id` - Eliminar computadora

##### Health Check

- `GET /health` - Estado del servicio
- `GET /ping` - Ping básico

### 4. Backend-reservations (Express) - Puerto 3003

**Ubicación**: `backend-reservations/`
**Tecnología**: Express + PostgreSQL + Joi

#### Responsabilidades:

- CRUD completo de reservaciones
- Validación de disponibilidad
- Consultas avanzadas por usuario, computadora, fecha y estado
- Gestión del ciclo de vida de reservaciones

#### Endpoints:

##### Reservations

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

##### Health Check

- `GET /health` - Estado del servicio

## Base de Datos

### PostgreSQL - Puerto 5432

**Configuración**:

- Host: `postgres` (Docker) / `localhost` (local)
- Usuario: `admin`
- Contraseña: `admin`
- Base de datos: `mydb`

### Estructura de Tablas

#### Users

- `id` (SERIAL PRIMARY KEY)
- `nombre` (VARCHAR)
- `email` (VARCHAR UNIQUE)
- `password` (VARCHAR)
- `rol` (VARCHAR)
- `cedula` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Labs

- `id` (SERIAL PRIMARY KEY)
- `nombre` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Computers

- `id` (SERIAL PRIMARY KEY)
- `nombre` (VARCHAR)
- `lab_id` (INTEGER, FK to labs)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Reservations

- `id` (SERIAL PRIMARY KEY)
- `computer_id` (INTEGER, FK to computers)
- `user_id` (INTEGER, FK to users)
- `fecha` (DATE)
- `hora` (TIME)
- `duracion` (INTEGER)
- `estado` (VARCHAR) - pendiente, confirmada, completada, cancelada
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Acceso a los Servicios

### URLs de Desarrollo

- **Frontend**: http://localhost:30005
- **Backend Principal**: http://localhost:3000
- **Backend-computers**: http://localhost:30004
- **Backend-persons**: http://localhost:30002
- **Backend-reservations**: http://localhost:30003
- **PostgreSQL**: localhost:5432

### Variables de Entorno

Todos los servicios usan las mismas variables de base de datos:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=admin
DB_PASS=admin
DB_NAME=mydb
```

## Flujo de Datos

1. **Inicialización**: El backend principal (NestJS) crea automáticamente todas las tablas usando TypeORM
2. **Gestión de Usuarios**: Backend-persons maneja todo el CRUD de usuarios
3. **Gestión de Labs/Computers**: Backend-computers maneja laboratorios y computadoras
4. **Gestión de Reservaciones**: Backend-reservations maneja todo el ciclo de vida de las reservaciones
5. **Relaciones**: Las FK garantizan integridad referencial entre servicios

## Características Especiales

### Validación de Disponibilidad

- Las reservaciones validan que no haya conflictos de horario
- Verificación automática antes de crear/actualizar reservaciones
- Soporte para exclusión de reservación actual al actualizar

### Gestión de Estados

- Estados: pendiente, confirmada, completada, cancelada
- Transiciones controladas del ciclo de vida

### Consultas Avanzadas

- Filtros por usuario, computadora, fecha, estado
- Consultas con JOIN para obtener detalles completos
- Rangos de fechas para reportes

### Relaciones Cascada

- Al eliminar un laboratorio se eliminan sus computadoras
- Las reservaciones mantienen integridad referencial

### Timestamps Automáticos

- Todas las tablas tienen created_at y updated_at
- TypeORM maneja automáticamente estos campos

### Validación de Datos

- Joi schemas para todas las operaciones
- Validación en tiempo real de tipos y formatos
- Validaciones específicas por microservicio

### Manejo de Errores

- Códigos HTTP apropiados para cada situación
- Mensajes de error descriptivos y consistentes
- Logging detallado para debugging

## Arquitectura del Proyecto

```
lab-reservation-system/
├── backend/                    # Backend principal NestJS
│   ├── src/
│   │   ├── entities/          # Entidades TypeORM compartidas
│   │   │   ├── user.entity.ts
│   │   │   ├── lab.entity.ts
│   │   │   ├── computer.entity.ts
│   │   │   ├── reservation.entity.ts
│   │   │   └── index.ts
│   │   └── database/
│   │       └── database.module.ts
│   └── ...
├── backend-persons/           # Microservicio de usuarios
│   ├── src/
│   │   ├── models.ts         # Modelos CRUD
│   │   ├── routes.ts         # API endpoints
│   │   └── types.ts          # Interfaces y validaciones
│   └── ...
├── backend-computers/         # Microservicio de labs/computers
│   ├── src/
│   │   ├── models.ts         # Modelos CRUD
│   │   ├── routes.ts         # API endpoints
│   │   └── types.ts          # Interfaces y validaciones
│   └── ...
├── backend-reservations/      # Microservicio de reservaciones
│   ├── src/
│   │   ├── models.ts         # Modelos CRUD
│   │   ├── routes.ts         # API endpoints
│   │   └── types.ts          # Interfaces y validaciones
│   └── ...
└── frontend/                  # Frontend Vue.js
    └── ...
```

## Ventajas de la Arquitectura

1. **Separación de responsabilidades**: Cada microservicio tiene una función específica
2. **Escalabilidad independiente**: Cada servicio puede escalar según su carga
3. **Mantenimiento simplificado**: Cambios en un servicio no afectan a otros
4. **Tecnologías específicas**: Cada servicio puede usar las mejores herramientas para su propósito
5. **Base de datos compartida**: Garantiza consistencia de datos con TypeORM
6. **Desarrollo paralelo**: Equipos pueden trabajar independientemente en cada servicio
