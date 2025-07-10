@echo off
setlocal enabledelayedexpansion

echo 🔄 Restarting Lab Reservation System...

echo 🗑️  Deleting existing deployments and services...
kubectl delete deployment --all
if %errorlevel% neq 0 (
    echo Warning: Failed to delete deployments
)
kubectl delete service --all --ignore-not-found=true
if %errorlevel% neq 0 (
    echo Warning: Failed to delete services
)

echo 📦 Building Docker images...
docker build -t backend:local ./backend
if %errorlevel% neq 0 (
    echo Error: Failed to build backend image
    exit /b 1
)

docker build -t backend-persons:local ./backend-persons
if %errorlevel% neq 0 (
    echo Error: Failed to build backend-persons image
    exit /b 1
)

docker build -t backend-computers:local ./backend-computers
if %errorlevel% neq 0 (
    echo Error: Failed to build backend-computers image
    exit /b 1
)

docker build -t backend-reservations:local ./backend-reservations
if %errorlevel% neq 0 (
    echo Error: Failed to build backend-reservations image
    exit /b 1
)

docker build -t frontend:local ./frontend
if %errorlevel% neq 0 (
    echo Error: Failed to build frontend image
    exit /b 1
)

echo ⚙️  Applying Kubernetes configurations...
kubectl apply -f k8s/config.yaml
if %errorlevel% neq 0 (
    echo Error: Failed to apply config.yaml
    exit /b 1
)

kubectl apply -f k8s/postgres-deployment.yaml
if %errorlevel% neq 0 (
    echo Error: Failed to apply postgres-deployment.yaml
    exit /b 1
)

kubectl apply -f k8s/backend-deployment.yaml
if %errorlevel% neq 0 (
    echo Error: Failed to apply backend-deployment.yaml
    exit /b 1
)

kubectl apply -f k8s/backend-persons-deployment.yaml
if %errorlevel% neq 0 (
    echo Error: Failed to apply backend-persons-deployment.yaml
    exit /b 1
)

kubectl apply -f k8s/backend-computers-deployment.yaml
if %errorlevel% neq 0 (
    echo Error: Failed to apply backend-computers-deployment.yaml
    exit /b 1
)

kubectl apply -f k8s/backend-reservations-deployment.yaml
if %errorlevel% neq 0 (
    echo Error: Failed to apply backend-reservations-deployment.yaml
    exit /b 1
)

kubectl apply -f k8s/frontend-deployment.yaml
if %errorlevel% neq 0 (
    echo Error: Failed to apply frontend-deployment.yaml
    exit /b 1
)

echo ✅ System restart completed successfully!
echo 🌐 You can access the application at: http://localhost:30001

pause
