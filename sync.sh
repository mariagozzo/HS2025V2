#!/bin/bash

# Función para verificar credenciales
test_credentials() {
    echo "Testing Git credentials..."
    git ls-remote origin > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo "Error: Git credentials are not valid. Please configure your credentials first."
        echo "You can use git config --global credential.helper store to save your credentials"
        exit 1
    fi
}

# Verificar si estamos en un repositorio Git
if [ ! -d ".git" ]; then
    echo "Error: This is not a Git repository"
    exit 1
fi

# Verificar credenciales antes de hacer cualquier operación
test_credentials

# Pull los cambios más recientes
echo "Pulling latest changes..."
git pull origin main
if [ $? -ne 0 ]; then
    echo "Error during pull. Skipping commit..."
    exit 1
fi

# Agregar todos los cambios locales
echo "Adding local changes..."
git add .

# Crear commit si hay cambios
echo "Checking for changes..."
if [ -n "$(git status --porcelain)" ]; then
    echo "Changes found. Creating commit..."
    git commit -m "Automatic sync: $(date)"
    if [ $? -ne 0 ]; then
        echo "Error during commit. Skipping push..."
        exit 1
    fi
    
    # Push los cambios
    echo "Pushing changes to main branch..."
    git push origin main
    if [ $? -ne 0 ]; then
        echo "Error during push to main branch. Please check your Git credentials and try again."
        exit 1
    fi

    # Sincronizar con GitHub Pages
    echo "Synchronizing with GitHub Pages..."
    ./sync-gh-pages.sh "Automatic sync to GitHub Pages: $(date)"
    if [ $? -ne 0 ]; then
        echo "Error during GitHub Pages sync. Please check your GitHub token and try again."
        exit 1
    fi
else
    echo "No changes to commit"
fi

echo "Sync completed successfully at $(date)"
