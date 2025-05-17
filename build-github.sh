#!/bin/bash

# Construir con la configuración de GitHub Pages
vite build --config vite.config.github.ts

# Crear directorio para GitHub Pages
mkdir -p dist/HS2025V2

# Mover todo el contenido al directorio HS2025V2
mv dist/* dist/HS2025V2/

# Actualizar index.html para usar la ruta correcta
sed -i '' 's|<script type="module" src=".*">|<script type="module" src="./assets/main.js">|' dist/HS2025V2/index.html

# Asegurarse de que el CNAME esté en la raíz del dist
mv CNAME dist/HS2025V2/
