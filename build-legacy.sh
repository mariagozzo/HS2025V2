#!/bin/bash

# Limpiar directorio dist
rm -rf dist

# Construir la aplicación
vite build --config vite.config.legacy.ts

# Mover todo a la carpeta HS2025V2
mkdir -p dist/HS2025V2
mv dist/* dist/HS2025V2/

# Actualizar index.html para usar la ruta correcta
sed -i '' 's|<script type="module" src=".*">|<script type="module" src="./assets/main.js">|' dist/HS2025V2/index.html

# Copiar CNAME
mv CNAME dist/HS2025V2/
