#!/bin/bash

# Limpiar directorio dist
rm -rf dist

# Construir la aplicación
vite build --config vite.config.base.ts

# Mover todo a la carpeta HS2025V2
mkdir -p dist/HS2025V2
mv dist/* dist/HS2025V2/

# Copiar CNAME
mv CNAME dist/HS2025V2/
