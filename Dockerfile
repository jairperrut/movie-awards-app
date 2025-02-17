FROM node:18 AS build

ENV PATH="node_modules/.bin:$PATH"

RUN apt update && apt install

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt update && apt install -yq google-chrome-stable

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# USER node

RUN npm run build --prod


FROM nginx:stable-alpine

COPY --from=build /app/dist/movie-awards-app/browser /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
