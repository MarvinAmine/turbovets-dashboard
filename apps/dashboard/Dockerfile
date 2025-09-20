# ---------- Build Stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy Tailwind configs explicitly so Angular sees them
COPY tailwind.config.js ./

# Copy the entire workspace (so angular.json + apps/ are present)
COPY . .

# Build the Angular dashboard app in production mode
RUN npx ng build dashboard --configuration production

# ---------- Runtime Stage ----------
FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

# Copy nginx config
COPY apps/dashboard/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Add runtime env entrypoint
COPY apps/dashboard/docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy built Angular app from build stage
COPY --from=build /app/dist/apps/dashboard ./

# Copy runtime env template (for env.js injection)
COPY apps/dashboard/public/env.template.js ./env.template.js

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
