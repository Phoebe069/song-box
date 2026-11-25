# 任何支持 Docker 的服务器都能用：docker build -t song-box . && docker run -p 8080:8080 -v songbox:/data song-box
FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY lib ./lib
COPY public ./public

ENV NODE_ENV=production
ENV PORT=8080
ENV DATA_DIR=/data

EXPOSE 8080
VOLUME ["/data"]

CMD ["node", "server.js"]
