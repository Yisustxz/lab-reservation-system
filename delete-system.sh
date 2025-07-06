#!/bin/bash

set -e

echo "🗑️  Deleting Lab Reservation System..."

echo "🔄 Deleting all deployments..."
kubectl delete deployment --all

echo "🔄 Deleting all services..."
kubectl delete service --all --ignore-not-found=true

echo "✅ System deletion completed successfully!" 