#!/bin/bash

# Limpiar dist
rm -rf dist

# Construir con la configuración de producción
vite build --config vite.config.prod.ts

# Copiar index.html a la raíz del dist
sed 's|<script type="module" src=".*">|<script type="module" src="./assets/main.js">|' index.html > dist/index.html

# Copiar archivos estáticos
mkdir -p dist/assets
mv dist/*.js dist/*.css dist/assets/

# Copiar otros archivos necesarios
mv dist/*.html .
rm -rf dist
mkdir dist
mv *.html dist/

# Mover assets de vuelta
mv assets/* dist/
rm -rf assets
