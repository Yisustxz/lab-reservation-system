# PowerShell script to restart Lab Reservation System
# Equivalent to restart-system.sh for Windows

$ErrorActionPreference = "Stop"

Write-Host "🔄 Restarting Lab Reservation System..." -ForegroundColor Cyan

Write-Host "🗑️  Deleting existing deployments and services..." -ForegroundColor Yellow
try {
    kubectl delete deployment --all
    Write-Host "✅ Deployments deleted successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Warning: Failed to delete deployments - $($_.Exception.Message)" -ForegroundColor Yellow
}

try {
    kubectl delete service --all --ignore-not-found=true
    Write-Host "✅ Services deleted successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Warning: Failed to delete services - $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "📦 Building Docker images..." -ForegroundColor Cyan

$images = @(
    @{name="backend"; path="./backend"},
    @{name="backend-persons"; path="./backend-persons"},
    @{name="backend-computers"; path="./backend-computers"},
    @{name="backend-reservations"; path="./backend-reservations"},
    @{name="frontend"; path="./frontend"}
)

foreach ($image in $images) {
    Write-Host "Building $($image.name)..." -ForegroundColor Blue
    try {
        docker build -t "$($image.name):local" $image.path
        Write-Host "✅ $($image.name) built successfully" -ForegroundColor Green
    } catch {
        Write-Host "❌ Error: Failed to build $($image.name) image - $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

Write-Host "⚙️  Applying Kubernetes configurations..." -ForegroundColor Cyan

$configs = @(
    "k8s/config.yaml",
    "k8s/postgres-deployment.yaml",
    "k8s/backend-deployment.yaml",
    "k8s/backend-persons-deployment.yaml",
    "k8s/backend-computers-deployment.yaml",
    "k8s/backend-reservations-deployment.yaml",
    "k8s/frontend-deployment.yaml"
)

foreach ($config in $configs) {
    Write-Host "Applying $config..." -ForegroundColor Blue
    try {
        kubectl apply -f $config
        Write-Host "✅ $config applied successfully" -ForegroundColor Green
    } catch {
        Write-Host "❌ Error: Failed to apply $config - $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ System restart completed successfully!" -ForegroundColor Green
Write-Host "🌐 You can access the application at: http://localhost:30001" -ForegroundColor Cyan

Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 