# Specify the base image
FROM node:18

WORKDIR /usr/src/app/data-service

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm i -g nodemon
RUN npm i -g amqplib

# Copy the rest of the application code
COPY . .

WORKDIR /usr/src/app/data-service/lib
COPY ./lib .

# Specify the command to run the application
CMD [ "npm", "run", "start:dev" ]
