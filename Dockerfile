# Stage 1: Build the Angular app
FROM node:20.7.0-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Angular app
RUN npm run build

# Stage 2: Serve the Angular app with NGINX
FROM nginx:alpine

# Copy the built Angular app from the previous stage to the NGINX default HTML directory
COPY --from=build /app/dist/frontend/ /usr/share/nginx/html

# Copy the custom NGINX configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow incoming traffic - MUST BE PORT 80
EXPOSE 80

#Remember if the Frontend port has changed you will need to update this in the backend
#May be easier to use the same port numbers that you have configured for cross origin to ensure everything runs as it should