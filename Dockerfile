FROM node:18-alpine AS build
WORKDIR /usr/src/app

# Install deps and build
COPY package.json package-lock.json* ./
RUN npm install --production=false || npm ci || true
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm install --production
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
