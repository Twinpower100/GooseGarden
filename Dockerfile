# mirror.gcr.io — если docker.io с IP даёт 403 (см. README / деплой в РФ)
FROM mirror.gcr.io/library/node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./
# Payload 3.81 + next@15.5.x: peer range mismatch; локально lock мог собираться иначе
RUN npm install --legacy-peer-deps

COPY . .

RUN mkdir -p /app/media

RUN npm run build

EXPOSE 3005

CMD ["npm", "start"]
