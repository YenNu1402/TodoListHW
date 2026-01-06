# Base image Node + Alpine
FROM node:20-alpine

# Cài nginx
RUN apk add --no-cache nginx

# Copy backend
COPY backend /app/backend

# Copy frontend (build hoặc trực tiếp folder frontend)
COPY frontend /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Cài node modules
WORKDIR /app/backend
RUN npm install

# Expose cổng
EXPOSE 80 3000

# Chạy script
CMD ["/start.sh"]
