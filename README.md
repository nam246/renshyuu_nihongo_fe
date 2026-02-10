This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev --port 3001
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tính năng chính

- JWT Auth?
- i18n?
- dark mode?

## Các route chính

- learning/[level]/grammar
- learning/[level]/vocabulary
- learning/[level]/kanji
- practice/[level]/grammar
- practice/[level]/vocabulary
- practice/[level]/kanji

## Learning

- learning sẽ cho học tập theo các bài học từ các nguồn giáo trình như Minna no Nihongo, Soumatome,...
- Sau khi login thì có trang Dashboard cho phép track thời gian đã học theo tuần, số lượng từ vựng, ngữ pháp đã học
- Cho phép tự nhập vào bài học mới, từ vựng hoặc kanji mới theo người dùng.
- ...
- Import bằng file PDF?
- Import bằng ANki?

## Practice

- Xây dựng chức năng mô phỏng bài thi theo dạng trắc nghiệm theo từ vựng, kanji, ngữ pháp, nghe, đọc.
- Khi login, người dùng cũng có thể tự nhập câu hỏi cho từ vựng, kanji, ngữ pháp, nghe, đọc

## Chức năng làm bài thi thử

## Có nên thêm 1 bảng giáo trình? (TextBook) => sẽ bỏ Source enum

```
Tên giáo trình
level
Lesson[]
textBookSkillType? Grammar | Vocabulary | Kanji | Reading | Listening
```

## Chắc là thêm 1 tính năng admin dashboard bằng Django admin?

## Layout theo nhóm trang (Grouped Layouts):

- app/(marketing)/layout.js: Cho các trang marketing (trang chủ, giới thiệu).
- app/(dashboard)/layout.js: Cho các trang admin/dashboard (có sidebar, header riêng).
- app/dashboard/page.js: Nội dung trang dashboard, được bao bọc bởi (dashboard)/layout.js.

### Mẹo nâng cao

- Grouped Layouts: Dùng (ten-group)/layout.js để tạo layout cho một nhóm trang mà không tạo thêm URL (ví dụ: (dashboard)).
- Parallel Routes: Dùng @folder/layout.js để render nhiều layout cùng lúc (ví dụ: layout chính và layout modal).


### Sửa lại page user

- không sử dụng tab, chia ra từng page 1
- sửa lại dashboard sidebar cho đúng link, tên.
- bỏ nút đăng xuất ở trang user
- sửa breadcrumb cho đúng với link

### Tham khảo 1 homepage mới có cấu trúc như sau:

```jsx
 <>
    <Navbar />
    <Hero />
    <Features />
    <FAQ />
    <Testimonial />
    <Pricing />
    <Footer />
</>
```

- Mình sẽ sửa lại phần navbar, sử dụng navbar theo cấu trúc mới nhưng vẫn giữ lại giao diện navbar cũ
- sửa phần hero, sử dụng hero mới
- Thêm phần FAQ
- Thêm phần features
- Tham khảo 1 số block để đồng bộ giao diện trên đây https://www.shadcnui-blocks.com/components/radio-group
- new nav menu đã tham khảo tại đây https://github.com/akash3444/shadcn-ui-landing-page/blob/main/app/page.tsx