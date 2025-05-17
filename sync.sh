#!/bin/bash

# Pull los cambios más recientes
echo "Pulling latest changes..."
git pull origin main

# Agregar todos los cambios locales
echo "Adding local changes..."
git add .

# Crear commit si hay cambios
echo "Checking for changes..."
if [ -n "$(git status --porcelain)" ]; then
    echo "Changes found. Creating commit..."
    git commit -m "Automatic sync: $(date)"
    
    # Push los cambios
    echo "Pushing changes..."
    git push origin main
else
    echo "No changes to commit"
fi

echo "Sync completed at $(date)"
