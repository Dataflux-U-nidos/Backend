# Usa la imagen oficial de Bun como base
FROM oven/bun:1.0 as builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json bun.lockb ./
COPY src ./src

# Instala dependencias
RUN bun install --frozen-lockfile

# Expone el puerto en el que corre el backend (ajústalo según tu configuración)
EXPOSE 3000

# Comando por defecto para ejecutar el servidor
CMD ["bun", "run", "dev"]
