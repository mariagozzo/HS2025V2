#!/bin/bash

# Limpiar dist
rm -rf dist

# Construir con la configuración de producción
vite build --config vite.config.prod.ts

# Mover assets a la raíz del dist
mv dist/assets/* dist/
rm -rf dist/assets

# Actualizar index.html para usar rutas relativas
sed -i '' 's|<script type="module" src=".*">|<script type="module" src="./assets/main.js">|' dist/index.html

# Asegurarse de que el CNAME esté en la raíz del dist
cp CNAME dist/
