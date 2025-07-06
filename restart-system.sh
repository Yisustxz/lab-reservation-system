#!/bin/bash

set -e

echo "🔄 Restarting Lab Reservation System..."

echo "🗑️  Deleting existing deployments and services..."
kubectl delete deployment --all
kubectl delete service --all --ignore-not-found=true

echo "📦 Building Docker images..."
docker build -t frontend:local ./frontend
docker build -t backend:local ./backend
docker build -t backend-persons:local ./backend-persons
docker build -t backend-computers:local ./backend-computers
docker build -t backend-reservations:local ./backend-reservations

echo "⚙️  Applying Kubernetes configurations..."
kubectl apply -f k8s/config.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-persons-deployment.yaml
kubectl apply -f k8s/backend-computers-deployment.yaml
kubectl apply -f k8s/backend-reservations-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

echo "✅ System restart completed successfully!"
echo "🌐 You can access the application at: http://localhost:30001"
