FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./jobs ./jobs
COPY ./middlewares ./middlewares
COPY ./models ./models

WORKDIR /usr/src/app/server

COPY ./stock_server/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY ./stock_server .

EXPOSE 4000
CMD [ "node", "server.js" ]
