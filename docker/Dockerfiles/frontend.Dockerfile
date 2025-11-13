# docker/Dockerfiles/frontend.Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY packages/shared-types ./packages/shared-types
COPY packages/utils ./packages/utils
COPY tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "run", "start"]
