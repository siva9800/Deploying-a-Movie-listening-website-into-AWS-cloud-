# Use the official Node.js image as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variables for MongoDB connection
ENV MONGODB_URI=<your-atlas-uri>

# Expose port 3000 for the application to listen on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]