# 🏡 Luxury Properties — Frontend Application

A modern web application built with **Next.js**, **React**, **TypeScript**, and **Shadcn UI Kit**.
It integrates **Axios** for API communication, **TanStack Query** for efficient remote state management, and a complete testing setup using **Jest** and **React Testing Library**.

---

## 🚀 Tech Stack

| Category                    | Technologies                                                                      |
| --------------------------- | --------------------------------------------------------------------------------- |
| **Framework**               | [Next.js 15](https://nextjs.org/)                                                 |
| **Language**                | [TypeScript](https://www.typescriptlang.org/)                                     |
| **UI & Styling**            | [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI Kit](https://ui.shadcn.com/) |
| **HTTP Client**             | [Axios](https://axios-http.com/)                                                  |
| **Data Fetching / Caching** | [TanStack Query (React Query)](https://tanstack.com/query/latest)                 |
| **Testing**                 | [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/) |

---

## 🧱 Project Structure

```
├── public/ # Static assets (images, icons, etc.)
├── src/
│ ├── app/ # Next.js App Router entry
│ │ ├── property/
│ │ │ └── [id]/ # Dynamic property details route
│ │ │ ├── components/ # Components for property detail page
│ │ │ ├── page.test.tsx # Unit tests for detail page
│ │ │ └── page.tsx # Property detail page component
│ │ ├── globals.css # Base global styles
│ │ ├── layout.tsx # Global layout for the app
│ │ └── page.tsx # Home page entry
│ │
│ ├── components/
│ │ ├── theme/ # Theme provider and context components
│ │ └── ui/ # Reusable UI components
│ │ ├── property-filters.tsx # Filter form for properties
│ │ ├── property-filters.test.tsx# Tests for PropertyFilters
│ │ └── property-grid.tsx # Grid layout for property listings
│ │
│ └── lib/ # Core logic and configuration
│ ├── api/ # API integration and endpoints
│ │ ├── apiClient.ts # Axios client configuration
│ │ ├── properties-local-data.ts # Mock/local data source
│ │ └── utils.ts # Helper utilities
│ ├── dtos/ # Data Transfer Objects and type definitions
│ └── react-query-provider.tsx # TanStack Query provider setup
└──
```

---

## Clone the Repository

```bash
git clone git@github.com:jhon-millionluxury/frontend-test.git

cd frontend-test
```

## ⚙️ Environment Setup

### 1️⃣ Prerequisites

Make sure you have the following installed:

- **Node.js ≥ 20**
- **npm**, **pnpm**, **yarn** or **bun** package manager

### 2️⃣ Environment Variables

Create a `.env` file at the root of your project base on `env.example` file.

```bash
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

### 3️⃣ Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

### 4️⃣ Run Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun dev
```

App runs at:
👉 http://localhost:PORT

Replace `PORT` with the port number you want to use.

---

## 🧠 Available Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start the development server         |
| `npm run build`      | Create an optimized production build |
| `npm run start`      | Run the app in production mode       |
| `npm run lint`       | Run ESLint for code validation       |
| `npm run test`       | Run Jest test suite                  |
| `npm run test:watch` | Run Jest in watch mode               |

---

## 🧩 Architecture Overview

- API Layer `(apiClient.ts)`
  Configured with Axios interceptors to handle responses and errors globally.

- Data Fetching with TanStack Query
  Each resource (like properties) uses useQuery hooks to manage loading, success, and error states efficiently.

- Clean Component Structure
  UI components are separated from business logic to ensure scalability and maintainability.

- Elegant Error and Loading States
  The UI includes visually consistent loading and error states aligned with the luxury branding.

---

## 🧪 Testing

### 🧰 Tools

- Jest — test runner and assertion library.
- React Testing Library — for user-centric UI testing.

### 📦 Test Structure

Each component has its own `\*.test.tsx` file either alongside it or under `/tests` directory.

### ▶️ Run Tests

```bash
npm run test
```

### 📦 Production Build

```bash
npm run build
npm run start
```

This generates an optimized build inside the `.next/` directory — ready to deploy on Vercel, Netlify, Docker, or any Node.js-compatible platform.

---

## 📝 License

This project is licensed under the `MIT License` — feel free to use, modify, and distribute it.
