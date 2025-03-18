----------------------------------------------------
        Guía Básica del proyecto back
----------------------------------------------------
Comandos Básicos de Bun

# Instalar todas las dependencias del proyecto
bun install

# Iniciar la aplicación en modo desarrollo
bun dev 
o
bun run --watch src/server.ts

# Compilar el proyecto para producción
bun build

# Ejecutar un archivo específico con Bun
bun run <archivo.ts>

# deben crear el .env y ponerle las variables de entorno


----------------------------------------------------
        Guía Básica de Comandos Git
----------------------------------------------------

# Ver el estado de los archivos
git status

# Agregar un archivo al área de preparación (staging)
git add <archivo>

# Agregar todos los archivos modificados
git add .

# Confirmar cambios en el repositorio local
git commit -m "Mensaje del commit"

Ramas (Branches)

# Ver todas las ramas
git branch

# Crear una nueva rama
git branch <nombre_rama>

# Cambiar a otra rama
git checkout <nombre_rama>

# Crear y cambiar a una nueva rama
git checkout -b <nombre_rama>

# Fusionar una rama con la actual
git merge <nombre_rama>

# Eliminar una rama local
git branch -d <nombre_rama>

Sincronizar con un Repositorio Remoto

# Ver los remotos configurados
git remote -v

# Agregar un remoto
git remote add origin <URL_DEL_REPOSITORIO>

# Subir cambios al repositorio remoto
git push origin <nombre_rama>

# Descargar cambios desde el repositorio remoto
git pull origin <nombre_rama>

Historial y Deshacer Cambios

# Ver el historial de commits
git log

# Ver cambios entre commits o en el working directory
git diff

# Revertir un commit (creando un commit de reversión)
git revert <commit_id>

# Resetear cambios en el staging area
git reset <archivo>

# Resetear al estado anterior sin afectar el working directory
git reset --soft <commit_id>

# Resetear completamente al estado anterior, perdiendo cambios
git reset --hard <commit_id>

Stash (Guardar Cambios Temporalmente)

# Guardar cambios temporalmente
git stash

# Listar los stashes almacenados
git stash list

# Recuperar el stash más reciente
git stash apply

# Recuperar y eliminar el stash
git stash pop

Manejo de Tags

# Crear un tag
git tag -a <nombre_tag> -m "Mensaje del tag"

# Ver tags existentes
git tag

# Subir tags al repositorio remoto
git push origin --tags

Otros Comandos Útiles

# Ver detalles de un commit
git show <commit_id>

# Buscar un cambio en el historial
git grep "texto_a_buscar"

# Borrar un archivo del área de staging
git rm --cached <archivo>
