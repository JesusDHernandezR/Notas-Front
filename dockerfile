FROM node:16-alpine AS build
WORKDIR /app

# Copiar el archivo package.json
COPY package.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente del frontend
COPY . .

# Construir el proyecto React
RUN npm run build

# Establecer la imagen de trabajo como imagen base Nginx
FROM nginx:latest

WORKDIR /usr/share/nginx/html

# Copiar los archivos estáticos generados
COPY --from=build /app/build .

# Exponer el puerto 80 
EXPOSE 80

# Servir el contenido estático con Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]