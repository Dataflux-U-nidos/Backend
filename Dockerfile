# Usa la imagen oficial de Bun como base
FROM oven/bun:1.0 as builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json bun.lock tsconfig.json ./
COPY src ./src
COPY .env ./

# Instala dependencias
RUN bun install 
RUN bun run build

# Etapa de producción (runner)
FROM oven/bun:1.0 as runner

WORKDIR /app

# Copia solo lo necesario para ejecutar la aplicación
COPY package.json bun.lock ./
COPY --from=builder /app/dist ./dist


RUN bun install

EXPOSE 3000

# Comando por defecto para ejecutar el servidor
CMD ["bun", "run", "start"]