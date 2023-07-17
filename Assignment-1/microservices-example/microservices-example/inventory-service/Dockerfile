# Specify the base image
FROM node:18

WORKDIR /usr/src/app/inventory-service

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm i -g nodemon

# Copy the rest of the application code
COPY . .

# Specify the command to run the application
CMD [ "npm", "run", "start:dev" ]
