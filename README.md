<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

সারা দেশের বাজারের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক দাম, দাম বাড়া-কমা এবং বাজারভিত্তিক তুলনা এক জায়গায়।

[🌐 Live Demo](https://bazardor-lilac.vercel.app/) · [📦 GitHub Repo](https://github.com/Maidul-057/Bazardor)

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

</div>

---

## 📖 About the Project

**BazarDor (বাজার দর)** is a responsive web application that helps people check the daily prices of essential goods such as rice, lentils, oil, vegetables, fish and meat. Users can see which products became more expensive or cheaper today, browse products by category, and compare prices across different markets and divisions of the country.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 15 (App Router)** | UI, routing, server-side data fetching |
| **TypeScript** | Type-safe code |
| **Tailwind CSS 4** | Styling and responsive design |
| **DaisyUI** | Ready-made UI components |
| **Better Auth** | Email/password, Google and GitHub authentication |
| **MongoDB Atlas** | Database for users and sessions |
| **react-hot-toast** | Toast notifications |
| **Vercel** | Deployment |

## ✨ Key Features

1. **📱 Fully responsive design:** works smoothly on mobile, tablet and desktop, with a stacked hero and a scrollable category navbar.
2. **📈 Live price ticker:** an infinite scrolling strip showing each product's emoji, name, price and ▲/▼ percentage change.
3. **🔺🔻 Daily risers and fallers:** the top 6 products whose prices went up and the top 6 whose prices went down today, plus a full all-products grid.
4. **🗂️ Category pages with smart sorting:** sort by default, price low to high, or price high to low. Sorting uses numeric values, and prices are shown in Bengali digits. Includes skeleton loaders and a friendly 404 state.
5. **🔐 Authentication and protected routes:** sign up and sign in with email/password, Google or GitHub. Product details are visible only to logged-in users, with toast messages for every action.
6. **🏪 Market-wise price details:** minimum, maximum and average prices, plus a division-wise table of markets for every product.
7. **👤 Profile and update:** a profile page where users can update their name.

## 🗺️ Pages

| Route | Description | Access |
|---|---|---|
| `/` | Home with hero, risers, fallers and all products | Public |
| `/category/[slug]` | Products of a category with sorting | Public |
| `/product/[slug]` | Price summary and market-wise prices | 🔒 Login required |
| `/signin`, `/signup` | Authentication | Public |
| `/profile` | User profile | 🔒 Login required |
| `/profile/update` | Update name | 🔒 Login required |
| `*` | Custom 404 page | Public |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── category/[slug]/         # Category page + loading skeleton
│   ├── product/[slug]/          # Protected product details
│   ├── signin/  signup/         # Auth pages
│   ├── profile/  profile/update/
│   └── api/auth/[...all]/       # Better Auth handler
├── components/                  # Navbar, Ticker, ProductCard, AuthForm, ...
└── lib/                         # API client, formatters, auth config
```

## 🚀 Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/APNAR-USERNAME/bazardor.git
cd bazardor

# 2. Install dependencies
npm install

# 3. Create the environment file
cp .env.example .env.local
# then fill in the values

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## 🔌 Data Source

Product and category data comes from a public JSON API:
`https://api.api-store.workers.dev/api/bazardor` (with an alternative fallback URL).

## 👨‍💻 Author

**Maidul Islam** · [GitHub](https://github.com/Maidul-057)

---

<div align="center">
সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
</div>
