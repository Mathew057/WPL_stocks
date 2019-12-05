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

WORKDIR /usr/src/app/server

COPY ./server/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY ./server .

EXPOSE 5000
CMD [ "npm", "run", "start"]
