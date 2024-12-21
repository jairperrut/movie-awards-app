FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build --prod

CMD ng serve --host 0.0.0.0

FROM nginx:stable-alpine

COPY --from=build /app/dist/golden-raspberry-awards /usr/share/nginx/html

EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
