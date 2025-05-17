#!/bin/bash

# Script para sincronizar automáticamente el repositorio
# Uso: ./sync-repo.sh "Mensaje del commit"

# Colores para la salida
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar si se ha proporcionado un mensaje de commit
if [ -z "$1" ]; then
  echo -e "${RED}Error: Debes proporcionar un mensaje para el commit${NC}"
  echo -e "Uso: ./sync-repo.sh \"Mensaje del commit\""
  exit 1
fi

# Verificar conexión con el repositorio remoto
echo -e "${YELLOW}Verificando conexión con el repositorio remoto...${NC}"
git ls-remote --exit-code origin &>/dev/null
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: No se puede acceder al repositorio remoto.${NC}"
  echo -e "${YELLOW}Verifica tu conexión a internet o los permisos del repositorio.${NC}"
  exit 1
fi

# Verificar si hay cambios para hacer commit
echo -e "${YELLOW}Verificando cambios en el repositorio...${NC}"
if [[ -z $(git status -s) ]]; then
  echo -e "${BLUE}No hay cambios pendientes en el repositorio.${NC}"
  echo -e "${GREEN}¡El repositorio está actualizado!${NC}"
  exit 0
fi

# Primero, comprobar si hay cambios remotos
echo -e "${YELLOW}Comprobando si hay cambios en el repositorio remoto...${NC}"
git fetch origin

# Si la rama local está detrás de la remota, hacer un pull antes
if [ "$(git rev-list HEAD..origin/main --count 2>/dev/null)" -gt 0 ]; then
  echo -e "${YELLOW}La rama local está desactualizada. Descargando cambios remotos...${NC}"
  
  # Guardar cambios locales temporalmente
  echo -e "${YELLOW}Guardando cambios locales...${NC}"
  git stash
  
  # Actualizar la rama local
  echo -e "${YELLOW}Actualizando la rama local...${NC}"
  git pull origin main
  
  # Aplicar cambios locales nuevamente
  echo -e "${YELLOW}Aplicando cambios locales guardados...${NC}"
  git stash pop
  
  # Verificar si hubo conflictos
  if [ -n "$(git ls-files --unmerged)" ]; then
    echo -e "${RED}Se detectaron conflictos al aplicar los cambios locales.${NC}"
    echo -e "${RED}Por favor, resuelve los conflictos manualmente y vuelve a intentarlo.${NC}"
    exit 1
  fi
else
  # Si no hay cambios remotos, intentar pull normal
  echo -e "${YELLOW}Actualizando el repositorio local desde GitHub...${NC}"
  git pull origin main
  
  # Si hay errores en el pull, salir
  if [ $? -ne 0 ]; then
    echo -e "${RED}Error al actualizar desde el repositorio remoto. Resuelve los conflictos manualmente.${NC}"
    exit 1
  fi
fi

# Agregando todos los cambios
echo -e "${YELLOW}Agregando todos los cambios...${NC}"
git add .

# Realizando el commit con el mensaje proporcionado
echo -e "${YELLOW}Realizando commit: $1${NC}"
git commit -m "$1"

# Subiendo los cambios al repositorio remoto
echo -e "${YELLOW}Subiendo cambios a GitHub...${NC}"
git push origin main

# Verificar si el push fue exitoso
if [ $? -eq 0 ]; then
  # Verificar explícitamente que los cambios se subieron correctamente
  echo -e "${YELLOW}Verificando que los cambios se hayan subido correctamente...${NC}"
  git fetch origin
  LOCAL_COMMIT=$(git rev-parse HEAD)
  REMOTE_COMMIT=$(git rev-parse origin/main 2>/dev/null)
  
  if [ "$LOCAL_COMMIT" = "$REMOTE_COMMIT" ]; then
    echo -e "${GREEN}¡Sincronización completada con éxito!${NC}"
    echo -e "${YELLOW}Detalles del commit:${NC}"
    echo -e "${BLUE}$(git log -1 --pretty=format:'%h - %an, %ar: %s')${NC}"
  else
    echo -e "${RED}¡Advertencia! Los cambios locales no coinciden con el repositorio remoto.${NC}"
    echo -e "${YELLOW}Intentando forzar la subida de cambios...${NC}"
    git push --force origin main
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}¡Sincronización forzada completada con éxito!${NC}"
    else
      echo -e "${RED}Error al forzar la subida de cambios.${NC}"
      echo -e "${YELLOW}Verifica tu configuración de rama y permisos en el repositorio.${NC}"
      exit 1
    fi
  fi
else
  echo -e "${RED}Error al subir los cambios. Intentando solución alternativa...${NC}"
  echo -e "${YELLOW}Ejecutando: git pull --rebase origin main${NC}"
  git pull --rebase origin main
  
  if [ $? -eq 0 ]; then
    echo -e "${YELLOW}Reintentando push después del rebase...${NC}"
    git push origin main
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}¡Sincronización completada con éxito después del rebase!${NC}"
      echo -e "${YELLOW}Detalles del commit:${NC}"
      echo -e "${BLUE}$(git log -1 --pretty=format:'%h - %an, %ar: %s')${NC}"
    else
      echo -e "${RED}Falló el segundo intento. Intenta resolver manualmente.${NC}"
      echo -e "${YELLOW}Posibles problemas: credenciales, configuración de rama o permisos.${NC}"
      exit 1
    fi
  else
    echo -e "${RED}Error en el rebase. Intenta resolver manualmente.${NC}"
    echo -e "${YELLOW}Verifica tus credenciales de Git y la configuración de rama.${NC}"
    echo -e "${YELLOW}Puedes intentar: ${BLUE}git config --global credential.helper cache${NC}"
    exit 1
  fi
fi

echo -e "${YELLOW}Estado actual de la rama:${NC}"
git status
echo -e "${YELLOW}Rama actual:${NC}"
git branch
echo -e "${YELLOW}Remotos configurados:${NC}"
git remote -v

git checkout main 