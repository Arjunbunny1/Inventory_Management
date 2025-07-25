# Use Node.js LTS version
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Command to run your application
CMD ["npm", "start"]
