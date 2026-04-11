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

# Copy the Nginx template
COPY nginx.conf.template /etc/nginx/conf.d/config.template

# Default PORT if not provided by Cloud Run
ENV PORT=8080

# Use envsubst to replace ${PORT} in the template and output to the default config location
# Then start Nginx
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/config.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
