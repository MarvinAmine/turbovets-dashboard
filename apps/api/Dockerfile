# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

RUN apk add --no-cache bash python3 make g++ libc6-compat libpq

# Copy package manifests (root + workspaces)
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/dashboard/package*.json ./apps/dashboard/

# Install deps
RUN npm install --include=dev

# Copy full source
COPY . .

# Build API
RUN npx tsc -p apps/api/tsconfig.build.json

# Stage 2: Runtime
FROM node:20-alpine AS runner
WORKDIR /workspace

RUN apk add --no-cache bash libc6-compat libpq \
  && addgroup -S nodejs && adduser -S nodejs -G nodejs

# Copy deps + build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/apps/api/package*.json ./apps/api/
COPY --from=build /app/dist ./dist

RUN npm install pg

USER nodejs
CMD ["node", "dist/main.js"]

