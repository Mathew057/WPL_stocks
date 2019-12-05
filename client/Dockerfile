FROM node:alpine as app-build

WORKDIR /usr/src/client
ENV PATH /usr/src/client/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=app-build /usr/src/client/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
