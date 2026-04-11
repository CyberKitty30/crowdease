# Step 1: Build stage
FROM node:20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Production stage
FROM nginx:latest

# Copy build artifacts
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy hardcoded nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Inform Cloud Run we use 8080
EXPOSE 8080

# Explicitly start nginx
CMD ["nginx", "-g", "daemon off;"]
