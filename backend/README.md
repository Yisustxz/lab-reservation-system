# Backend - Lab Reservation System

Backend principal que gestiona el health check de todos los microservicios.

## Inicialización

### 1. Base de Datos (PRIMERO)

```bash
# Iniciar PostgreSQL con Docker
docker run --name postgres-lab \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres:13
```

### 2. Microservicios

```bash
# Backend-persons
cd backend-persons
npm install
npm run dev

# Backend-computers
cd backend-computers
npm install
npm run dev

# Backend-reservations
cd backend-reservations
npm install
npm run dev
```

### 3. Backend Principal

```bash
cd backend
npm install
npm run start:dev
```

## Endpoints

- `GET /health` - Health check completo de todos los microservicios
- `GET /health/simple` - Health check básico
- `GET /environment` - Información del entorno
- `GET /ping` - Ping básico

## Variables de Entorno

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=admin
DB_NAME=mydb

DEPLOYMENT_TYPE=local
BACKEND_PERSONS_LOCAL_URL=http://localhost:3002
BACKEND_COMPUTERS_LOCAL_URL=http://localhost:3001
BACKEND_RESERVATIONS_LOCAL_URL=http://localhost:3003
```

## Kubernetes (Producción)

```bash
# 1. Iniciar cluster
kubectl apply -f k8s/

# 2. Verificar servicios
kubectl get pods
kubectl get svc
```
