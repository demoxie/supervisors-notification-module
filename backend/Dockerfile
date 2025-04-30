# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npx", "ts-node-dev", "src/index.ts"]
EXPOSE 5000
