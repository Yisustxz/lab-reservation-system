# Construye el frontend

docker build -t frontend:local ./frontend

# Construye el backend

docker build -t backend:local ./backend

# Construye el microservicio de notificaciones

docker build -t notifications:local ./notifications

# Construye (variables y secretos)

kubectl apply -f k8s/config.yaml

# Construye la base de datos

kubectl apply -f k8s/postgres-deployment.yaml

# Construye los pods de cada servicio

kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/notifications-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Ver pods en ejecucion

kubectl get pods

# Ver servicios

kubectl get svc
