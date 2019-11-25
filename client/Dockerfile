FROM node:alpine as app-build

WORKDIR /usr/src/client

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_baseAPIURL=http://localhost:5000

RUN npm run-script build

FROM nginx:latest

COPY --from=app-build /usr/src/client/build/ /usr/share/nginx/html

EXPOSE 80
