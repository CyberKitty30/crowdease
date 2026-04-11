# Step 1: Build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Check if build output exists
RUN ls -la /app/dist

# Step 2: Production stage (Unprivileged Nginx is recommended for Cloud Run)
FROM nginxinc/nginx-unprivileged:stable-alpine

# Copy build artifacts
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx config (Unprivileged image uses 8080 by default)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Inform Cloud Run we use 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
