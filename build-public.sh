#!/bin/bash

# Limpiar directorio dist
rm -rf dist

# Construir la aplicación
vite build --config vite.config.public.ts

# Crear estructura de carpetas
mkdir -p dist/HS2025V2/assets

# Copiar archivos estáticos
cp -r public/* dist/HS2025V2/

# Copiar CNAME
cp CNAME dist/HS2025V2/

# Copiar index.html a la carpeta HS2025V2
mkdir -p dist/HS2025V2
mv dist/index.html dist/HS2025V2/

# Actualizar index.html para usar la ruta correcta
sed -i '' 's|<script type="module" src=".*">|<script type="module" src="./assets/main.js">|' dist/HS2025V2/index.html
