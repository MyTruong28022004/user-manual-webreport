# WebReport User Guide

## Mở tài liệu

Mở `index.html` trực tiếp trong trình duyệt. Giao diện và ảnh minh họa được nhúng trong file. Trang dùng tiếng Nhật mặc định. Chọn **Tiếng Việt** ở đầu trang để chuyển ngôn ngữ. Trình duyệt ghi nhớ lựa chọn này.

## Phát triển

Cần Node.js 22.13 trở lên và npm. Chạy `npm ci`, sau đó `npm run dev`. Vite mở `source.html` làm trang phát triển. Nội dung tiếng Việt và ảnh hướng dẫn lấy từ `WebReport Manual.html`. Bản dịch nội dung nằm trong `manual-ja.json`; nhãn giao diện và phần tra cứu nằm trong `manual-locales.js`. Phần cài đặt sử dụng `installation-guide.jsx`, `setup-evidence.js` và ảnh trong `assets/setup-live/`. Chạy `npm run build` để tạo `dist/index.html` và cập nhật bản `index.html` ở thư mục gốc.

## Triển khai lên Vercel

1. Đưa mã nguồn, bao gồm `assets/setup-live/`, `package-lock.json` và `vercel.json`, lên GitHub, GitLab hoặc Bitbucket.
2. Trong Vercel, chọn **Add New → Project** và import repository. Chọn thư mục chứa `package.json` làm Root Directory nếu repository có nhiều dự án.
3. Giữ cấu hình trong `vercel.json`: lệnh cài đặt `npm ci`, lệnh build `npm run build`, thư mục đầu ra `dist`. Chọn Node.js 22 trong Project Settings nếu cần.
4. Chọn **Deploy**. Không cần biến môi trường cho trang hướng dẫn này.

Ảnh được nhúng vào HTML khi build. Địa chỉ `localhost` trong hướng dẫn dùng để kiểm tra WebReport trên máy đang cài Tomcat.

## Deploy trực tiếp từ thư mục, không cần Git

Mở PowerShell tại thư mục dự án và chạy:

```powershell
npx vercel login
npx vercel
```

Làm theo hướng dẫn đăng nhập, chọn tài khoản hoặc team và tạo hoặc liên kết dự án. Lệnh thứ hai tạo một bản preview và trả về URL. Khi đã kiểm tra, chạy `npx vercel --prod` để đưa lên production. Mỗi lần cập nhật, chạy lại lệnh deploy từ cùng thư mục. `.vercelignore` loại bộ cài, tài liệu tham chiếu và các bộ ảnh chụp cũ khỏi lần triển khai qua CLI.
