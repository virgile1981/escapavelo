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
RUN npm install 
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
