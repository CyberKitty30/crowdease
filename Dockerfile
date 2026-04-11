# Use full Node (Debian) for maximum compatibility
FROM node:20

WORKDIR /app

# Install simple production server
RUN npm install -g sirv-cli

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Verify build output
RUN ls -la dist/index.html

# Expose port 8080
EXPOSE 8080

# Cloud Run injects the PORT variable. sirv -s handles React routing.
CMD ["sh", "-c", "sirv dist --port ${PORT:-8080} --single --host 0.0.0.0"]
