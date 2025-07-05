# Sử dụng một Node.js image chính thức.
# https://hub.docker.com/_/node
FROM node:18-alpine

# Tạo thư mục ứng dụng
WORKDIR /usr/src/app

# Cài đặt dependencies của ứng dụng
# Ký tự đại diện được sử dụng để đảm bảo cả package.json và package-lock.json đều được sao chép
# nơi có sẵn.
COPY package*.json ./

RUN npm install
# Nếu bạn đang xây dựng mã cho production
# RUN npm ci --only=production

# Sao chép mã nguồn ứng dụng
COPY . .

# Mở cổng mà ứng dụng đang chạy
EXPOSE 5000

# Chạy ứng dụng
CMD [ "node", "server.js" ] 