#!/bin/bash

# Limpiar directorio dist
rm -rf dist

# Crear estructura de carpetas
mkdir -p dist/HS2025V2

# Copiar archivos estáticos
cp -r public/* dist/HS2025V2/

# Copiar CNAME
cp CNAME dist/HS2025V2/

# Construir la aplicación
vite build --config vite.config.main.ts

# Actualizar index.html para usar la ruta correcta
sed -i '' 's|<script type="module" src=".*">|<script type="module" src="./assets/main.js">|' dist/HS2025V2/index.html
