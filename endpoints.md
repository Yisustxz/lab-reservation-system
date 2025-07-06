# Endpoints Mapping - Lab Reservation System

Este documento mapea los endpoints del **Backend API Gateway** con los endpoints de los microservicios correspondientes.

## Backend API Gateway (Puerto 3001)

El backend actúa como un API Gateway que redirige las peticiones a los microservicios correspondientes.

---

## 🧑‍💼 Users/Persons Endpoints

### Backend API Gateway → Backend-Persons Service

| Backend Gateway         | Backend-Persons Service | Método | Descripción                |
| ----------------------- | ----------------------- | ------ | -------------------------- |
| `GET /api/users`        | `GET /api/users`        | GET    | Obtener todos los usuarios |
| `GET /api/users/:id`    | `GET /api/users/:id`    | GET    | Obtener usuario por ID     |
| `POST /api/users`       | `POST /api/users`       | POST   | Crear nuevo usuario        |
| `PUT /api/users/:id`    | `PUT /api/users/:id`    | PUT    | Actualizar usuario         |
| `DELETE /api/users/:id` | `DELETE /api/users/:id` | DELETE | Eliminar usuario           |

### ✅ Estado: Todos los endpoints coinciden perfectamente

---

## 💻 Computers/Labs Endpoints

### Backend API Gateway → Backend-Computers Service

| Backend Gateway                  | Backend-Computers Service        | Método | Descripción                          |
| -------------------------------- | -------------------------------- | ------ | ------------------------------------ |
| `GET /api/labs`                  | `GET /api/labs`                  | GET    | Obtener todos los laboratorios       |
| `GET /api/labs/:id`              | `GET /api/labs/:id`              | GET    | Obtener laboratorio por ID           |
| `POST /api/labs`                 | `POST /api/labs`                 | POST   | Crear nuevo laboratorio              |
| `PUT /api/labs/:id`              | `PUT /api/labs/:id`              | PUT    | Actualizar laboratorio               |
| `DELETE /api/labs/:id`           | `DELETE /api/labs/:id`           | DELETE | Eliminar laboratorio                 |
| `GET /api/computers`             | `GET /api/computers`             | GET    | Obtener todas las computadoras       |
| `GET /api/computers/:id`         | `GET /api/computers/:id`         | GET    | Obtener computadora por ID           |
| `POST /api/computers`            | `POST /api/computers`            | POST   | Crear nueva computadora              |
| `PUT /api/computers/:id`         | `PUT /api/computers/:id`         | PUT    | Actualizar computadora               |
| `DELETE /api/computers/:id`      | `DELETE /api/computers/:id`      | DELETE | Eliminar computadora                 |
| `GET /api/labs/:labId/computers` | `GET /api/labs/:labId/computers` | GET    | Obtener computadoras por laboratorio |

### ✅ Estado: Todos los endpoints coinciden perfectamente

---

## 📅 Reservations Endpoints

### Backend API Gateway → Backend-Reservations Service

| Backend Gateway                              | Backend-Reservations Service                 | Método | Descripción                           |
| -------------------------------------------- | -------------------------------------------- | ------ | ------------------------------------- |
| `GET /api/reservations`                      | `GET /api/reservations`                      | GET    | Obtener todas las reservaciones       |
| `GET /api/reservations/details`              | `GET /api/reservations/details`              | GET    | Obtener reservaciones con detalles    |
| `GET /api/reservations/:id`                  | `GET /api/reservations/:id`                  | GET    | Obtener reservación por ID            |
| `POST /api/reservations`                     | `POST /api/reservations`                     | POST   | Crear nueva reservación               |
| `PUT /api/reservations/:id`                  | `PUT /api/reservations/:id`                  | PUT    | Actualizar reservación                |
| `DELETE /api/reservations/:id`               | `DELETE /api/reservations/:id`               | DELETE | Eliminar reservación                  |
| `GET /api/reservations/user/:userId`         | `GET /api/reservations/user/:userId`         | GET    | Obtener reservaciones por usuario     |
| `GET /api/reservations/computer/:computerId` | `GET /api/reservations/computer/:computerId` | GET    | Obtener reservaciones por computadora |
| `GET /api/reservations/status/:status`       | `GET /api/reservations/status/:status`       | GET    | Obtener reservaciones por estado      |

### ✅ Estado: Todos los endpoints coinciden perfectamente

---

## 🏥 Health Check Endpoints

### Backend API Gateway

| Endpoint      | Descripción                  |
| ------------- | ---------------------------- |
| `GET /health` | Health check del API Gateway |

### Microservicios

| Microservicio        | Endpoint      | Puerto |
| -------------------- | ------------- | ------ |
| Backend-Persons      | `GET /health` | 3002   |
| Backend-Computers    | `GET /health` | 3000   |
| Backend-Reservations | `GET /health` | 3003   |

---

## 📋 Resumen del Sistema

### ✅ Todas las Incongruencias Resueltas

**Cambios Realizados:**

1. **Backend API Gateway**:

   - ❌ Eliminado: `GET /api/users/email/:email`
   - ❌ Eliminado: `GET /api/users/cedula/:cedula`
   - ❌ Eliminado: `PUT /api/reservations/:id/status`

2. **Backend-Reservations**:

   - ❌ Eliminado: `GET /api/reservations/date-range/:startDate/:endDate`
   - ❌ Eliminado: `POST /api/reservations/check-availability`
   - ❌ Eliminado: Método `getByDateRange` del modelo

3. **Backend-Persons**: Sin cambios (mantiene funciones de validación internas)

### ✅ Estado Final: Sistema Completamente Consistente

1. **Backend-Persons**: Todos los endpoints coinciden perfectamente
2. **Backend-Computers**: Todos los endpoints coinciden perfectamente
3. **Backend-Reservations**: Todos los endpoints coinciden perfectamente

---

## 🔧 Variables de Entorno Requeridas

```bash
# Backend API Gateway
BACKEND_PERSONS_SERVICE_URL=http://localhost:3002
BACKEND_COMPUTERS_SERVICE_URL=http://localhost:3000
BACKEND_RESERVATIONS_SERVICE_URL=http://localhost:3003
```

---

## 📝 Arquitectura del Sistema

El sistema está compuesto por:

- **API Gateway** (Puerto 3001): Punto de entrada único que redirige las peticiones
- **Backend-Persons** (Puerto 3002): Gestión de usuarios y personas
- **Backend-Computers** (Puerto 3000): Gestión de laboratorios y computadoras
- **Backend-Reservations** (Puerto 3003): Gestión de reservaciones

**✅ Todos los microservicios están perfectamente alineados sin incongruencias.**

---

## 🎯 Funcionalidades Implementadas

### Usuarios (Backend-Persons)

- CRUD completo de usuarios
- Validación de unicidad por email y cédula
- Manejo de roles y permisos

### Computadoras y Laboratorios (Backend-Computers)

- CRUD completo de laboratorios
- CRUD completo de computadoras
- Relación laboratorio-computadoras

### Reservaciones (Backend-Reservations)

- CRUD completo de reservaciones
- Validación de disponibilidad automática
- Consultas por usuario, computadora y estado
- Reservaciones con detalles completos

El sistema está listo para producción con arquitectura de microservicios consistente.
