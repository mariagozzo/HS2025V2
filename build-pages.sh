#!/bin/bash

# Limpiar directorios anteriores
rm -rf dist
rm -rf build

# Crear estructura de directorios
mkdir -p build/HS2025V2

# Copiar archivos estáticos
mkdir -p build/HS2025V2/assets

# Construir la aplicación
vite build --config vite.config.pages.ts

# Mover archivos generados a la estructura correcta
mv dist/* build/HS2025V2/

# Actualizar index.html para que use rutas relativas
sed -i '' 's|<script type="module" src=".*">|<script type="module" src="./assets/main.js">|' build/HS2025V2/index.html

# Copiar CNAME
mv CNAME build/HS2025V2/

# Mover todo a dist para el deploy
mv build/* dist/
rm -rf build
