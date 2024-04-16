# Use Node.js LTS version as base image
FROM node:lts-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the server will run
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production

# Command to start the server
CMD ["npm", "start"]