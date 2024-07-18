# Use a base Node.js image with the desired version
FROM node:20 as base

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV VITE_BACKEND_URL=http://localhost:3000/

# Stage for running tests
FROM base as test
RUN npm test

# Stage for building the application
FROM test as build
RUN npm run build

# Stage for serving the application
FROM node:14 as production
RUN npm install -g serve

# Copy build output from the build stage to the production stage
COPY --from=build /usr/src/app/dist /app

# Expose port 4000
EXPOSE 4000

# Command to run the server
CMD ["serve", "-s", "/app", "-l", "4000"]
