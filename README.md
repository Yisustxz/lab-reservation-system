# Lab Reservation System

Sistema de reservas de laboratorio con arquitectura de microservicios.

## Construcción de Imágenes Docker

```bash
# Construye el frontend
docker build -t backend:local ./backend
docker build -t backend-persons:local ./backend-persons
docker build -t backend-computers:local ./backend-computers
docker build -t backend-reservations:local ./backend-reservations
docker build -t frontend:local ./frontend
```

## Despliegue en Kubernetes

```bash
# Construye (variables y secretos)
kubectl apply -f k8s/config.yaml

# Construye la base de datos
kubectl apply -f k8s/postgres-deployment.yaml

# Construye los pods de cada servicio
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-persons-deployment.yaml
kubectl apply -f k8s/backend-computers-deployment.yaml
kubectl apply -f k8s/backend-reservations-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Ver pods en ejecución
kubectl get pods
kubectl get svc
```
