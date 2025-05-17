#!/bin/bash

# Construir la aplicación
npm run build

# Navegar a la carpeta dist
if [ ! -d "dist" ]; then
    echo "No se encontró la carpeta dist"
    exit 1
fi
cd dist

# Inicializar git si no está inicializado
if [ ! -d ".git" ]; then
    git init
fi

# Añadir todos los archivos
rm -f .gitignore
rm -f .gitmodules
git add .

# Crear commit
msg="Deploy to GitHub Pages $(date)"
if [ $# -eq 1 ]; then
    msg="$1"
fi
git commit -m "$msg"

# Configurar y empujar al repositorio
if [ -z "${GITHUB_TOKEN}" ]; then
    echo "Por favor, establece la variable de entorno GITHUB_TOKEN"
    exit 1
fi

git push -f https://${GITHUB_TOKEN}@github.com/mariagozzo/HS2025V2.git gh-pages:gh-pages
