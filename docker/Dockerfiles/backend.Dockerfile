# docker/Dockerfiles/backend.Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# Copie les manifests pour npm install
COPY package.json ./
COPY tsconfig.json ./
COPY apps/backend ./apps/backend
COPY packages ./packages

# Build du backend
RUN npm install --ignore-scripts
RUN npm run build --workspace packages/shared-types
RUN npm run build --workspace packages/utils       
#to install the packages modules in node_modules
RUN npm install --ignore-scripts
RUN npm run build --workspace apps/backend


FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup -S nonroot \
  && adduser -S nonroot -G nonroot
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/package.json ./
RUN mkdir -p uploads/blog/tmp 
RUN mkdir -p uploads/destination/tmp 
RUN mkdir -p uploads/blog/tmp \
    && mkdir -p uploads/destination/tmp \
    && chown -R nonroot:nonroot /app
USER nonroot

EXPOSE 4000
CMD ["node", "dist/main.js"]
