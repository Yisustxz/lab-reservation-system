# Backend-Computers

Microservicio dedicado a la gestión de laboratorios y computadoras del sistema de reservas de laboratorio.

## Importante

Las entidades de TypeORM se encuentran en `backend/src/entities/`. Este microservicio utiliza PostgreSQL y modelos de datos propios para la lógica de negocio.

## Descripción

Este microservicio maneja toda la lógica relacionada con laboratorios y computadoras:

- Gestión de laboratorios (CRUD completo)
- Gestión de computadoras (CRUD completo)
- Consultas de computadoras por laboratorio
- Validación de datos con Joi

## Base de Datos

- **PostgreSQL** (compartida con el backend principal)
- **Puerto**: 5432
- **Base de datos**: mydb

### Estructura de la base de datos

Las tablas principales son:

- `labs`: Información de laboratorios
- `computers`: Información de computadoras con referencia al laboratorio

## Endpoints

### Laboratorios

- `GET /api/labs` - Obtener todos los laboratorios
- `GET /api/labs/:id` - Obtener laboratorio por ID
- `POST /api/labs` - Crear nuevo laboratorio
- `PUT /api/labs/:id` - Actualizar laboratorio
- `DELETE /api/labs/:id` - Eliminar laboratorio

### Computadoras

- `GET /api/computers` - Obtener todas las computadoras
- `GET /api/computers/:id` - Obtener computadora por ID
- `GET /api/labs/:labId/computers` - Obtener computadoras por laboratorio
- `POST /api/computers` - Crear nueva computadora
- `PUT /api/computers/:id` - Actualizar computadora
- `DELETE /api/computers/:id` - Eliminar computadora

### Health Check

- `GET /health` - Verificar estado del servicio
- `GET /ping` - Ping simple

## Variables de Entorno

```env
PORT=3002
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=admin
DB_NAME=mydb
```

## Instalación y Ejecución

### Desarrollo

```bash
cd backend-computers
npm install
npm run dev
```

### Producción

```bash
cd backend-computers
npm install
npm run build
npm start
```

## Características Especiales

- **Validación de datos**: Utiliza Joi para validar los datos de entrada
- **Relaciones**: Maneja la relación entre laboratorios y computadoras
- **Consultas específicas**: Permite obtener computadoras filtradas por laboratorio
- **Manejo de errores**: Respuestas consistentes y manejo robusto de errores

## Arquitectura

```
backend-computers/
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

Este microservicio está diseñado para manejar únicamente la gestión de laboratorios y computadoras, proporcionando una API RESTful limpia y enfocada.
