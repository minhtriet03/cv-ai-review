# Giai đoạn 1: Build ứng dụng React
FROM node:18-alpine AS build

WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Build ứng dụng cho production
RUN npm run build

# Giai đoạn 2: Phục vụ ứng dụng với Nginx
FROM nginx:stable-alpine

# Sao chép các tệp đã build từ giai đoạn 'build' vào thư mục phục vụ của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Mở cổng 80 cho Nginx
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"] 