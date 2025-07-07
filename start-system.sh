#!/bin/bash

set -e

echo "🚀 Starting Lab Reservation System deployment..."

echo "📦 Building Docker images..."
docker build -t backend:local ./backend
docker build -t backend-persons:local ./backend-persons
docker build -t backend-computers:local ./backend-computers
docker build -t backend-reservations:local ./backend-reservations
docker build -t frontend:local ./frontend

echo "⚙️  Applying Kubernetes configurations..."
kubectl apply -f k8s/config.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-persons-deployment.yaml
kubectl apply -f k8s/backend-computers-deployment.yaml
kubectl apply -f k8s/backend-reservations-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

echo "✅ System deployment completed successfully!"
echo "🌐 You can access the application at: http://localhost:30001"
