# 🛒 বাজার দর (BazarDor)

নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর — সারা দেশের বাজারের দাম ও ওঠানামা এক নজরে।

**Live:** _add your Vercel URL_

## Technologies
Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · DaisyUI · Better Auth (MongoDB) · react-hot-toast

## Features
1. Responsive UI (mobile / tablet / desktop) with a live scrolling price ticker
2. Daily top risers ▲ and fallers ▼ plus an all-products grid with Bengali digits
3. Category pages with skeleton loading, 404-style empty state and numeric price sorting
4. Protected product details page with min / max / average and market-wise prices
5. Better Auth: email/password, Google & GitHub login, toasts for every auth action
6. Profile page with Update Name feature

## Run locally
```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```
