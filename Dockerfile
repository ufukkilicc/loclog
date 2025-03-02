# Base Node
FROM node:22.9.0-alpine AS base
WORKDIR /loclog
COPY *.json ./

# Dependencies
FROM base AS dependencies
RUN npm install

# Development
FROM base AS development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN npm install -g @nestjs/cli
RUN npm run build
CMD ["npm", "run", "start:dev"]

# Production
FROM base AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY --from=development /loclog/dist ./dist
RUN npm install --prod
CMD ["node", "dist/main"]

