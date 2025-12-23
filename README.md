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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tính năng chính

- JWT Auth?
- i18n?
- dark mode?

# Các route chính

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

# Item structure

```json
// Lesson table
// Vocabulary table
// Kanji table
// Grammar table