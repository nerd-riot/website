# Hướng dẫn thiết lập Supabase, Cloudflare R2 & Vercel cho NERD RIOT

Tài liệu này hướng dẫn chi tiết từng bước để bạn thiết lập 3 dịch vụ nền tảng: **Supabase** (Database), **Cloudflare R2** (Lưu trữ file cài đặt .dmg/.zip), và **Vercel** (Deploy Website).

---

## 1. Thiết lập Supabase (PostgreSQL & Metadata)

### Bước 1: Tạo Project mới
1. Đăng nhập vào [Supabase Dashboard](https://supabase.com/dashboard).
2. Chọn **New Project**, đặt tên (ví dụ: `nerd-riot`), chọn Database Password và region (khuyến nghị `Singapore (ap-southeast-1)` để có độ trễ thấp nhất về Việt Nam/Châu Á).

### Bước 2: Chạy Database Migration
1. Trong menu bên trái, mở **SQL Editor**.
2. Nhấn **New Query**.
3. Mở file [supabase/migrations/20261030000001_initial_schema.sql](file:///Users/khoa.nguyen/Workings/Personal/nerd-riot/website/supabase/migrations/20261030000001_initial_schema.sql), sao chép toàn bộ nội dung và dán vào SQL Editor.
4. Nhấn **Run** (Cmd + Enter).
   - Migration sẽ tự động tạo 5 bảng (`projects`, `releases`, `release_assets`, `download_events`, `feedback`), cấu hình các chỉ mục (indexes), bật Row Level Security (RLS) và nạp sẵn dữ liệu mẫu cho **DBNerd**.

### Bước 3: Lấy API Keys
1. Vào mục **Project Settings** (biểu tượng bánh răng) > **API**.
2. Sao chép 3 giá trị sau:
   - **Project URL** ➜ `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** ➜ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** ➜ `SUPABASE_SERVICE_ROLE_KEY` *(Không bao giờ đưa key này vào client)*.

---

## 2. Thiết lập Cloudflare R2 (Lưu trữ file nhị phân & Update Manifest)

### Bước 1: Tạo R2 Bucket
1. Đăng nhập [Cloudflare Dashboard](https://dash.cloudflare.com/) > chọn **R2 Object Storage**.
2. Nhấn **Create bucket**, đặt tên bucket là `nerd-riot-releases` (chọn Location Hint `Asia Pacific (APAC)`).
3. Đặt quyền truy cập bucket là **Private**.

### Bước 2: Gắn Custom Domain cho Download
1. Trong màn hình cài đặt Bucket > chọn tab **Settings**.
2. Tại phần **Public access**, chọn **Connect Domain**.
3. Điền tên miền bạn muốn (ví dụ: `download.nerd-riot.dev` nếu domain quản lý trên Cloudflare).
4. Cloudflare sẽ tự động trỏ DNS và sinh chứng chỉ SSL. Khi đó biến môi trường của bạn sẽ là:
   `DOWNLOAD_BASE_URL=https://download.nerd-riot.dev`

### Bước 3: Tạo API Token cho R2
1. Trở ra trang chủ R2, click chọn **Manage R2 API Tokens**.
2. Nhấn **Create API token**:
   - Permissions: **Object Read & Write**
   - Apply to specific bucket: chọn `nerd-riot-releases`
3. Lưu lại:
   - **Access Key ID** ➜ `CLOUDFLARE_R2_ACCESS_KEY_ID`
   - **Secret Access Key** ➜ `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
   - **Account ID** (hiển thị trên URL hoặc trang R2) ➜ `CLOUDFLARE_ACCOUNT_ID`
   - **Endpoint** ➜ `CLOUDFLARE_R2_ENDPOINT` (dạng `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`)

### Cấu trúc đường dẫn file trên R2:
```
/{project}/{version}/{platform}/{architecture}/{filename}
```
Ví dụ:
```
/dbnerd/0.1.0/darwin/arm64/DBNerd_0.1.0_aarch64.dmg
/dbnerd/0.1.0/darwin/x64/DBNerd_0.1.0_x64.dmg
/dbnerd/0.1.0/darwin/arm64/DBNerd.app.tar.gz
/dbnerd/0.1.0/darwin/arm64/DBNerd.app.tar.gz.sig
```

---

## 3. Thiết lập Vercel (Deployment)

### Bước 1: Kết nối Repo
1. Đăng nhập vào [Vercel](https://vercel.com).
2. Nhấn **Add New...** > **Project**.
3. Import GitHub repository: `nerd-riot/website`.
4. Framework Preset: **Next.js** (tự động nhận diện).
5. Build Command: `bun run build` (hoặc `next build`).
6. Install Command: `bun install`.

### Bước 2: Cấu hình Environment Variables trên Vercel
Thêm các biến sau (từ `.env.example`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_BUCKET=nerd-riot-releases
DOWNLOAD_BASE_URL=https://download.nerd-riot.dev
ADMIN_EMAILS=anhkhoa.nguyen2610@gmail.com
```

### Bước 3: Deploy
- Nhấn **Deploy**. Vercel sẽ tự động build và cung cấp domain chạy production (có thể add custom domain `nerd-riot.dev` trong project settings).
