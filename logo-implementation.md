# Hướng dẫn triển khai logo mới

## Chuẩn bị các file

Đã tạo các file SVG cho logo của trang web:

- `/frontend/public/images/new-logo.svg` - Logo chính cho header
- `/frontend/public/images/logo192.svg` - Logo cho biểu tượng ứng dụng (192x192)
- `/frontend/public/images/favicon.svg` - Logo cho favicon (64x64)

## Chuyển đổi SVG sang PNG và ICO

Bạn cần chuyển đổi các file SVG thành các định dạng khác để đảm bảo tương thích trên tất cả các trình duyệt:

1. **Chuyển đổi SVG sang PNG**:

   - Sử dụng công cụ online như [SVG to PNG](https://svgtopng.com/)
   - Hoặc sử dụng Adobe Illustrator, Figma hoặc Inkscape

2. **Tạo favicon.ico**:

   - Sử dụng công cụ online như [favicon.io](https://favicon.io/favicon-converter/)
   - Tải lên file PNG và tạo favicon.ico

3. **Lưu các file sau vào thư mục frontend/public/images/**:
   - favicon.ico
   - logo192.png
   - logo512.png (tương tự logo192.png nhưng kích thước lớn hơn)
   - new-logo.png (để dự phòng cho trình duyệt không hỗ trợ SVG)

## Cấu hình đã được cập nhật

Các file sau đã được cập nhật để sử dụng logo mới:

1. **frontend/src/components/header.js**:

   - Đã cập nhật đường dẫn tới logo mới
   - Đã điều chỉnh kích thước logo

2. **frontend/public/index.html**:

   - Đã thêm favicon
   - Đã cập nhật title và meta tags

3. **frontend/public/manifest.json**:
   - Đã tạo file manifest cho PWA
   - Đã cấu hình các biểu tượng ứng dụng

## Màu sắc thương hiệu

Màu sắc chính của thương hiệu:

- Xanh dương: `#2196F3` (primary)
- Xanh dương đậm: `#1565C0` (gradient end)
- Cam: `#FF5722` (accent color cho biểu tượng AI)

## Kiểm tra và triển khai

Sau khi đã tạo tất cả các file, hãy kiểm tra:

1. Khởi động lại ứng dụng để xem logo mới trong header
2. Kiểm tra favicon trên các tab trình duyệt
3. Kiểm tra tính tương thích trên các trình duyệt khác nhau

Nếu có lỗi, hãy kiểm tra lại đường dẫn file và định dạng của các file.

## Lưu ý

Nếu cần chỉnh sửa logo, bạn có thể chỉnh sửa trực tiếp các file SVG bằng trình chỉnh sửa văn bản hoặc sử dụng các công cụ như Adobe Illustrator, Figma, hay Inkscape.
