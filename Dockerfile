# PROJECT OVERTHINK — Production Dockerfile
FROM node:20-slim AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build frontend bundle
COPY . .
RUN npm run build

# Production runtime stage
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy package manifests and production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy server, database logic, built frontend, and public assets
COPY server.js ./
COPY server/ ./server/
COPY public/ ./public/
COPY python/ ./python/
COPY --from=builder /app/dist ./dist

# Create persistent data directory for SQLite
RUN mkdir -p /app/data

EXPOSE 3001

CMD ["node", "server.js"]
