# mirror.gcr.io — если docker.io с IP даёт 403 (см. README / деплой в РФ)
FROM mirror.gcr.io/library/node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p /app/media

RUN npm run build

EXPOSE 3005

CMD ["npm", "start"]
