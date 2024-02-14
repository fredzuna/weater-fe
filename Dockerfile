#FROM node
#WORKDIR /app
#COPY . .
#RUN npm install
#EXPOSE 5172
#CMD ["npm", "run", "dev"]

# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory to /usr/src/app
WORKDIR /usr/src/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your Nest.js application will run on
EXPOSE 3021

# Define the command to run your application
CMD ["npm", "run", "dev"]