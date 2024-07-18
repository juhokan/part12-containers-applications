# Use Node.js 16 as the base image (replace with a supported version)
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable for Vite backend URL
ENV VITE_BACKEND_URL=http://localhost:8888/api/

# Expose port if necessary (not required if using Docker Compose ports mapping)

# Command to start the development server
CMD ["npm", "run", "dev"]