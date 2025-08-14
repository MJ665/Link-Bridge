
# LinkBridge - A Full-Stack Link Forwarding Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000?style=for-the-badge&logo=nextauth.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn-ui&logoColor=white)

A full-stack link shortening and forwarding platform built with the T3 stack philosophy, featuring magic link authentication, a user dashboard for link management, and click tracking.

</div>

---

## 🚀 Live Demo

**URL:** [https://link-bridge.mj665.in](https://link-bridge.mj665.in)  
**Short Link Format:** `https://link-bridge.mj665.in/go/[slug]`

---

## 📋 Table of Contents
- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#%EF%B8%8F-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#%EF%B8%8F-deployment)
- [Contact](#-contact)

---

## 📖 About The Project

LinkBridge is a modern web application that allows authenticated users to create, manage, and track short URLs that redirect to external websites. It provides a clean, intuitive dashboard where users can view all their links, see how many times each link has been clicked, and edit or delete them as needed. The project is built using the **Next.js App Router** for a robust and scalable foundation.

---

## ✨ Key Features
- **Email Magic Link Authentication**: Secure, passwordless login using NextAuth.js.
- **Authenticated Dashboard**: Manage your links after signing in.
- **Create Short Links**: Generate short, memorable links for any URL (custom or auto-generated slugs).
- **Manage Links**: Edit or delete links anytime.
- **Click Tracking**: View how many times each link has been visited.
- **URL Forwarding**: Short links redirect instantly to the original destination.
- **Modern UI/UX**: Responsive, accessible design using Tailwind CSS + ShadCN UI.
- **Type-Safe**: Implemented in TypeScript.

---

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Authentication:** NextAuth.js (Email Provider)
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN
- **Language:** TypeScript

---

## 📸 Screenshots

![Edit Dialog](./public/ReadmeScreenshot/1.png)
![Edit Dialog](./public/ReadmeScreenshot/2.png)
![Edit Dialog](./public/ReadmeScreenshot/3.png)
![Edit Dialog](./public/ReadmeScreenshot/4.png)

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have:
- Node.js
- npm / yarn / pnpm
- A PostgreSQL database instance (Neon, Supabase, or local)

### Installation & Setup
```sh
git clone https://github.com/MJ665/Link-Bridge.git
cd linkbridge
npm install
cp .env.example .env
````

### Database Setup

```sh
npx prisma migrate dev --name init
```

### Run Development Server

```sh
npm run dev
```

App runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="noreply@example.com"
# if you have to use the personal gmail account you can setup google account password
# type app password in the search box of accounts.google.com
```

---

## ☁️ Deployment

Deployed easily to **Vercel**, **Netlify**, or any Node.js host.

**Build Command:**

```json
"build": "prisma generate && next build"
```

Ensure environment variables are set in your hosting provider.

Live Version: **[https://link-bridge.mj665.in](https://link-bridge.mj665.in)**

---

## 👤 Contact

**Meet Joshi** – [meet.joshi.665@gmail.com](mailto:contact.hackathonmj@gmail.com)
GitHub: [your-username](https://github.com/MJ665/)
Project Link: [https://github.com/MJ665/Link-Bridge](https://github.com/MJ665/Link-Bridge)

