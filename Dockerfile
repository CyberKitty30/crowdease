# Step 1: Build the React/Vite app
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:stable-alpine

# Copy the build output
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Use Nginx's built-in template feature for environment variables
# This will automatically replace ${PORT} in the template and output to /etc/nginx/conf.d/default.conf
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Cloud Run's default port
ENV PORT=8080

# The official Nginx image's entrypoint will handle the template substitution
CMD ["nginx", "-g", "daemon off;"]
