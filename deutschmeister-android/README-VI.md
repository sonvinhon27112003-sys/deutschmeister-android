# DeutschMeister PWA – bản tối ưu cho điện thoại Android

Gói này chuyển file React/TSX gốc thành dự án web app cài được lên màn hình chính. Bản điện thoại có thanh điều hướng cố định ở dưới, nút bấm lớn hơn, vùng nội dung cuộn thoải mái và hỗ trợ vùng an toàn của màn hình.

## Quan trọng: đây chưa phải APK

PWA được cài từ một website HTTPS. Sau khi website được triển khai, bạn mở link bằng Chrome trên Android và chọn **Cài đặt ứng dụng** hoặc **Thêm vào màn hình chính**. Không cần đưa app lên Play Store.

## Cách dùng hoàn toàn bằng điện thoại Android (không cần cài công cụ lập trình trên máy)

Dự án cần được build trên dịch vụ đám mây trước khi cài. Một cách phổ biến là dùng GitHub + Vercel:

1. Tải ZIP dự án về điện thoại và giải nén bằng ứng dụng quản lý tệp.
2. Trên Chrome Android, đăng nhập GitHub và tạo repository mới.
3. Tải các file **bên trong thư mục dự án đã giải nén** lên repository, giữ nguyên cấu trúc thư mục (`src`, `public`, cùng các file cấu hình ở thư mục gốc). Không tải riêng file ZIP như một file duy nhất.
4. Mở https://vercel.com, đăng nhập bằng GitHub, chọn **Add New → Project**, rồi import repository vừa tạo.
5. Vercel thường tự nhận Vite. Kiểm tra cấu hình: Build Command `npm run build`, Output Directory `dist`, rồi chọn **Deploy**. Vercel sẽ cài các gói và build trên máy chủ; không cần cài Node.js trên điện thoại. Tài liệu: https://vercel.com/docs/frameworks/frontend/vite
6. Khi triển khai thành công, mở URL HTTPS do Vercel cấp bằng Chrome trên Android.
7. Nhấn menu Chrome **⋮** → **Cài đặt ứng dụng** (Install app) hoặc **Thêm vào màn hình chính** → xác nhận.
8. Mở biểu tượng DeutschMeister ở màn hình chính. Thanh điều hướng dưới cùng dùng để chuyển giữa Hằng ngày, Lộ trình, Bài học, Luyện nói, Cơ khí và Lịch học.

> Giao diện GitHub/Vercel trên điện thoại có thể hơi chật; nếu việc tải lên nhiều file khó thao tác, có thể cần dùng chế độ **Trang web cho máy tính** trong menu Chrome. Vercel build từ repository và tự cấp URL HTTPS; xem hướng dẫn triển khai Vite tại https://vite.dev/guide/static-deploy.

## Nếu có máy tính (đường ngắn hơn)

1. Giải nén ZIP.
2. Cài Node.js LTS từ https://nodejs.org/.
3. Mở terminal tại thư mục dự án và chạy:
   ```bash
   npm install
   npm run build
   ```
4. Đưa thư mục `dist` lên dịch vụ hosting tĩnh, ví dụ Netlify Drop: https://app.netlify.com/drop.
5. Mở URL HTTPS trên Chrome Android và cài như hướng dẫn ở trên.

## Lưu ý về tính năng

- Đây là PWA, không phải file APK Android.
- Chưa có website trực tuyến được tạo sẵn từ gói ZIP này.
- Phần phỏng vấn AI trong mã nguồn gốc có API key để trống (`const apiKey = ""`), vì vậy gọi Gemini chưa hoạt động. Không nên đặt API key bí mật trong frontend công khai; muốn bật AI an toàn cần backend/serverless function.
- Nhận diện giọng nói phụ thuộc trình duyệt, Internet và quyền micro.
- Tiến độ được lưu trong localStorage của trình duyệt; xóa dữ liệu trình duyệt hoặc đổi trình duyệt có thể làm mất tiến độ.
- Chưa thể xác nhận build thành công trong môi trường hiện tại do không kết nối được npm registry; cần kiểm tra trạng thái build khi triển khai trên dịch vụ đám mây.
