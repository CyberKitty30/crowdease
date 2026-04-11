# Step 1: Build the app
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the app
FROM node:20-alpine
WORKDIR /app

# Install 'serve' utility
RUN npm install -g serve

# Copy only the built files from the previous stage
COPY --from=build-stage /app/dist ./dist

# Use the PORT environment variable provided by Cloud Run
# 'serve -s' handles SPA routing (Single Page Application)
CMD serve -s dist -l ${PORT:-8080}
