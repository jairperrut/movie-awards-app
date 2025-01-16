FROM node:18 AS build

ENV PATH="node_modules/.bin:$PATH"

RUN apt update

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod


FROM nginx:stable-alpine

COPY --from=build /app/dist/movie-awards-app/browser /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
