FROM node:16.20-alpine
RUN apk add --no-cache nginx curl
WORKDIR /backend
EXPOSE 3005
COPY package*.json ./
COPY prisma/ /backend/prisma/
RUN npm install
COPY . .
RUN npm run build
RUN chmod -R 755 .
RUN echo "server { listen 80 default_server; location / { proxy_pass http://localhost:3005; proxy_set_header Host \$host; }}" >  /etc/nginx/http.d/default.conf
