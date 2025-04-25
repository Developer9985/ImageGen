# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Build React app
RUN npm run build

# Serve with a static server
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
