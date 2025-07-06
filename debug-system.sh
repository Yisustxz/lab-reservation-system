#!/bin/bash

echo "🔍 Debugging Lab Reservation System..."

echo "📊 Checking Kubernetes pods status..."
kubectl get pods -o wide

echo ""
echo "🌐 Checking services..."
kubectl get services

echo ""
echo "📋 Checking ConfigMaps..."
kubectl get configmaps

echo ""
echo "🔍 Checking pod logs (last 50 lines)..."
echo "--- Backend logs ---"
kubectl logs -l app=backend --tail=50 2>/dev/null || echo "No backend pods found"

echo ""
echo "--- Backend-persons logs ---"
kubectl logs -l app=backend-persons --tail=50 2>/dev/null || echo "No backend-persons pods found"

echo ""
echo "--- Backend-computers logs ---"
kubectl logs -l app=backend-computers --tail=50 2>/dev/null || echo "No backend-computers pods found"

echo ""
echo "--- Backend-reservations logs ---"
kubectl logs -l app=backend-reservations --tail=50 2>/dev/null || echo "No backend-reservations pods found"

echo ""
echo "--- Postgres logs ---"
kubectl logs -l app=postgres --tail=50 2>/dev/null || echo "No postgres pods found"

echo ""
echo "🔗 Testing connectivity..."
echo "Postgres service:"
kubectl exec -it deployment/backend -- nc -zv postgres 5432 2>/dev/null || echo "Cannot connect to postgres"

echo ""
echo "✅ Debug completed!" 