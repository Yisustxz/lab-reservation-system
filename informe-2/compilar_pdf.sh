#!/bin/bash

# Script para compilar el informe LaTeX a PDF
# Requiere: pdflatex

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con color
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar si pdflatex está instalado
check_latex() {
    if ! command -v pdflatex &> /dev/null; then
        print_error "pdflatex no está instalado o no está en el PATH"
        echo "En Ubuntu/Debian: sudo apt-get install texlive-latex-base texlive-latex-extra"
        echo "En macOS: brew install mactex"
        exit 1
    fi
    print_success "pdflatex encontrado"
}

# Limpiar archivos auxiliares de LaTeX
clean_latex_files() {
    print_info "Limpiando archivos auxiliares..."
    rm -f *.aux *.log *.out *.toc *.lof *.lot *.fls *.fdb_latexmk *.synctex.gz
    print_success "Archivos auxiliares eliminados"
}

# Crear directorio de imágenes si no existe
create_images_dir() {
    if [ ! -d "images" ]; then
        mkdir -p images
        print_info "Creado directorio: images/"
    fi
    
    # Verificar si existe el logo
    if [ ! -f "images/Logo_UCAB_3.png" ]; then
        print_warning "images/Logo_UCAB_3.png no existe"
        print_warning "El documento se compilará, pero la imagen no se mostrará"
    fi
}

# Compilar el documento LaTeX
compile_latex() {
    local filename="informe.tex"
    
    if [ ! -f "$filename" ]; then
        print_error "El archivo $filename no existe"
        exit 1
    fi
    
    print_info "Compilando $filename..."
    
    # Primera compilación
    print_info "Primera compilación..."
    if ! pdflatex -interaction=nonstopmode "$filename" > /dev/null 2>&1; then
        print_error "Error en la primera compilación"
        pdflatex -interaction=nonstopmode "$filename"
        exit 1
    fi
    
    # Segunda compilación para referencias cruzadas
    print_info "Segunda compilación (referencias cruzadas)..."
    if ! pdflatex -interaction=nonstopmode "$filename" > /dev/null 2>&1; then
        print_error "Error en la segunda compilación"
        pdflatex -interaction=nonstopmode "$filename"
        exit 1
    fi
    
    # Tercera compilación para tabla de contenidos
    print_info "Tercera compilación (tabla de contenidos)..."
    if ! pdflatex -interaction=nonstopmode "$filename" > /dev/null 2>&1; then
        print_error "Error en la tercera compilación"
        pdflatex -interaction=nonstopmode "$filename"
        exit 1
    fi
    
    local pdf_name="${filename%.tex}.pdf"
    
    if [ -f "$pdf_name" ]; then
        print_success "PDF generado exitosamente: $pdf_name"
        
        # Mostrar información del archivo
        local file_size=$(stat -f%z "$pdf_name" 2>/dev/null || stat -c%s "$pdf_name" 2>/dev/null)
        local size_kb=$((file_size / 1024))
        print_info "Tamaño del archivo: ${size_kb} KB"
        
        return 0
    else
        print_error "No se pudo generar el PDF"
        exit 1
    fi
}

# Abrir el PDF automáticamente
open_pdf() {
    local pdf_file="informe.pdf"
    
    if [ -f "$pdf_file" ]; then
        print_info "Intentando abrir el PDF automáticamente..."
        
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            if command -v xdg-open &> /dev/null; then
                xdg-open "$pdf_file" &
            fi
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            open "$pdf_file"
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
            start "$pdf_file"
        fi
    fi
}

# Función principal
main() {
    echo "🚀 Compilador de Informe LaTeX"
    echo "================================"
    
    # Verificar instalación de LaTeX
    check_latex
    
    # Crear directorio de imágenes
    create_images_dir
    
    # Compilar el documento
    compile_latex
    
    # Limpiar archivos auxiliares
    clean_latex_files
    
    echo
    print_success "¡Compilación exitosa!"
    print_info "Puedes abrir el archivo informe.pdf"
    
    # Intentar abrir el PDF automáticamente
    open_pdf
}

# Ejecutar función principal
main "$@" 