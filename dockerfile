
FROM node:21.6.2

WORKDIR /app

# Instalar las dependencias de la aplicación
COPY package.json ./

RUN npm install

COPY . .

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]
