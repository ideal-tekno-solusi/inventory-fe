FROM node:24.7-alpine3.21

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npm i -g serve

CMD [ "serve", "-s", "dist/inventory-fe/browser", "-l", "0", "-p", "8080"]
