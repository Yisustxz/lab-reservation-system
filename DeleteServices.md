# Eliminar Servicios Conflictivos

### 6. Verificar servicios restantes

```bash
kubectl get svc
```

### 7. Verificar pods restantes

```bash
kubectl get pods
```

### 1. Eliminar servicio

```bash
kubectl delete deployment --all
kubectl delete service --all --ignore-not-found=true

kubectl delete service notifications
kubectl delete service persons
kubectl delete service reservations
kubectl delete service computers
kubectl delete service postgres
kubectl delete service frontend
kubectl delete service backend
kubectl delete service backend-reservations
```

### 2. Eliminar deployment

```bash
kubectl delete deployment notifications
kubectl delete deployment persons
kubectl delete deployment reservations
kubectl delete deployment computers
kubectl delete deployment postgres
kubectl delete deployment frontend
kubectl delete deployment backend
kubectl delete deployment backend-reservations
```

## Verificar Nuevos Servicios

```bash
kubectl get svc
kubectl get pods
```

## Acceso a los Servicios

Una vez aplicadas las configuraciones:

- **Backend-persons**: http://localhost:30002
- **Backend-computers**: http://localhost:30001
- **Backend-reservations**: http://localhost:30003
