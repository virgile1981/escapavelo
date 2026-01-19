# docker/Dockerfiles/frontend.Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY apps/frontend ./apps/frontend
COPY packages ./packages

# Build du frontend
RUN npm install 

RUN npm run build --workspace packages/shared-types
RUN npm run build --workspace packages/utils       

#to install the packages modules in node_modules
RUN npm install --ignore-scripts

# 1. Définir l'hôte de l'API (assurez-vous que c'est bien le nom du service Docker Compose)
# Remplacez "backend-api" et le port 3000 par vos valeurs si elles sont différentes
# ARG API_HOST=localhost/api

# 2. Le mécanisme d'attente (nécessite 'curl' ou 'wget' dans l'image de build)
# Cette commande s'exécute TANT QUE (until) la requête curl échoue.
# Elle utilise le nom du service Docker Compose pour la résolution DNS.
# RUN apk add curl
# RUN echo "Waiting for backend at $API_HOST to be ready..." && \
#     /bin/sh -c 'until curl -s $API_HOST; do echo "Backend is unavailable - sleeping 5s"; sleep 5; done' && \
#     echo "Backend is up - starting build"
RUN npm run build --workspace apps/frontend


FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/package.json ./
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4000
CMD ["npm", "run", "start"]
