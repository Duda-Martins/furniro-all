# 🛋️ Furniro Web

> 📖 [Versão em português](README.md) | English version

A furniture e-commerce interface built with React, TypeScript, and Tailwind CSS. The frontend integrates authentication with the NestJS API and keeps `json-server` as a mock mode for the catalog.

<div align="center">

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red?logo=nestjs)](https://nestjs.com/)

</div>

---

## 📖 About the Project

**Furniro Web** is a furniture e-commerce interface built with a focus on visual fidelity, responsiveness, and clean code organization within the React ecosystem. The project reproduces classic sections of an online store landing page, including a paginated product catalog, an inspiration carousel, an animated gallery, and a newsletter form.

The project was built following:

- ✅ **Componentization** - Small, reusable components with a single responsibility
- ✅ **Type Safety** - TypeScript across the whole application, including domain models
- ✅ **Service Layer** - API communication isolated in `services/`
- ✅ **Paginated API Consumption** - Product listing with incremental loading ("Show More")
- ✅ **User Feedback** - Notifications with `react-toastify` and form validation
- ✅ **Utility-First Styling** - Tailwind CSS v4 with a custom theme (fonts, animations)
- ✅ **Performance** - React Compiler enabled via a Babel plugin in Vite

---

## ✨ Features

- 🖼️ **Hero Section** with a call-to-action for the new collection
- 📂 **Browse The Range** - category navigation (Dining, Living, Bedroom) with hover effect
- 🛍️ **Product Catalog** featuring:
    - Paginated loading via a "Show More" button in mock mode
    - Dynamic discount badges (`-X%`) and "New" product badges (based on posting date)
    - Hover overlay with **Share**, **Compare**, and **Like** actions
    - Add to cart with toast notification
- 🎠 **Inspiration Carousel** (Splide) with a highlighted active slide, custom pagination, and navigation
- ♾️ **Infinite Gallery** (`#FuniroFurniture`) with horizontal scroll animation via pure CSS
- 📧 **Newsletter Form** with real-time email validation and toast feedback
- 📱 **Responsive Menu** with a hamburger button for mobile devices
- 🔐 **Authentication** with login, registration, and protected checkout and contact pages
- 🛒 **Persistent cart** with Zustand and local storage
- 💳 **Checkout** with validation and ZIP code lookup
- 🔗 **Complete Footer** with social media, institutional links, and newsletter

---

## 🛠️ Tech Stack

### Core

| Technology       | Version | Purpose                   |
| ---------------- | ------- | ------------------------- |
| **React**        | ^19.2.7 | UI library                |
| **TypeScript**   | ~6.0.2  | Static typing             |
| **Vite**         | ^8.1.1  | Build tool and dev server |
| **Tailwind CSS** | ^4.3.2  | Utility-first styling     |

### Libraries

| Library                    | Version | Purpose                         |
| -------------------------- | ------- | ------------------------------- |
| **@splidejs/react-splide** | ^0.7.12 | Image carousel                  |
| **react-toastify**         | ^11.1.0 | Toast notifications             |
| **json-server**            | ^0.17.4 | Mocked REST API for development |

### Dev & Quality

- **@vitejs/plugin-react** + **@rolldown/plugin-babel** - React Compiler integration
- **@tailwindcss/vite** - Official Tailwind plugin for Vite

---

## 🏗️ Project Architecture

### Folder Structure

```
src/
├── main.tsx                       # Application entry point
├── App.tsx                        # Composition of page sections
├── index.css                      # Tailwind theme, fonts, and Splide/Toastify overrides
├── vite-env.d.ts
├── components/                    # UI components
│   ├── Header.tsx
│   ├── Logo.tsx
│   ├── Nav.tsx
│   ├── UserAndCartIcon.tsx
│   ├── Hero.tsx
│   ├── MainBtn.tsx
│   ├── BrowseSection.tsx
│   ├── ProductsSection.tsx
│   ├── ProductCard.tsx
│   ├── Badge.tsx
│   ├── InspirationSection.tsx
│   ├── Carrousel.tsx
│   ├── CarrouselSlide.tsx
│   ├── FuniroFurnitureSection.tsx
│   ├── InfinityGallery.tsx
│   ├── PrincipalGrid.tsx
│   ├── Footer.tsx
│   └── FormNewsletter.tsx
├── models/                        # TypeScript contracts and types
│   ├── ProductModel.ts
│   ├── ProductCategory.ts
│   ├── ProductFilterModel.ts
│   ├── ProductResponseModel.ts
│   └── slide.ts
├── services/                      # API communication
│   ├── api.ts
│   └── ProductService.ts
├── data/                          # Static data used by the UI
│   ├── grid.ts
│   └── slides.ts
├── types/
│   └── splide.d.ts                # Manual typings for @splidejs/react-splide
└── public/
    ├── img/                        # Product, grid, and carousel images
    └── icons/                      # Public icons

db/
└── db.json                        # Mocked database consumed by json-server
```

### Data Flow

```
ProductsSection → ProductService.getProducts() → API configured in `VITE_API_URL`
    → ProductResponseModel → ProductCard (rendering)
```

`ProductService` currently keeps the legacy `json-server` contract, using `_page`, `_limit`, `_sort`, `_order`, and the `X-Total-Count` header. Full adaptation to the NestJS API parameters remains an integration task.

---

## 📊 Data Model

```
┌───────────────────────────┐
│       ProductModel        │
├───────────────────────────┤
│ id: number                │
│ name: string               │
│ category: productCategory │  → "Dining" | "Living" | "Bedroom"
│ description: string       │
│ image: string              │
│ price: number              │
│ discount: number           │
│ postedAt: string           │
└───────────────────────────┘
```

**Display rules:**

- Product shows a discount badge when `discount > 0`
- Product shows a "New" badge when posted less than 30 days ago and has no active discount
- Final price is calculated in real time: `price * (1 - discount / 100)`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18+)
- **npm**

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Duda-Martins/furniro-web2.git
cd furniro-web2
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the mocked API (json-server):**

```bash
npm run server
```

This starts the REST API at `http://localhost:3000`, serving data from `db/db.json`.

4. **In another terminal, start the frontend:**

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (Vite's default port).

> ⚠️ **Important:** the frontend depends on json-server running in parallel — without it, the product listing won't load, since `ProductService` fetches from `http://localhost:3000/products`.

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Starts the frontend with Vite (hot reload)
npm run server        # Starts the mocked API with json-server

# Build & Production
npm run build         # Type-checks (tsc -b) and builds for production with Vite
npm run preview       # Serves the production build locally

# Code Quality
npm run lint          # Runs ESLint
```

---

## 🎨 Design & Styling

- **Fonts:** Poppins (body text and headings) and Montserrat, loaded via Google Fonts
- **Main palette:** gold `#B88E2F` (actions and highlights), dark gray `#3A3A3A` (text), light gray `#F4F5F7` (card backgrounds)
- **Custom animations:**
    - `animate-gallery`: continuous horizontal scroll for the `#FuniroFurniture` gallery, defined via `@theme` in Tailwind
    - Hover transitions on product cards, social icons, and "Browse The Range" menu items
- **Splide carousel:** styled via class overrides in `index.css` to reproduce the active slide with larger dimensions and custom pagination

---

## 📈 Possible Future Improvements

- 🔍 Implement product filters by category, price, and discount (`ProductFilterModel` already supports this)
- 🔌 Consolidate `ProductService` with the NestJS API contract
- 🧪 Add automated tests (unit and integration)
- 🌐 Migrate from `json-server` to a real API in production

---

## 📝 License

This project is licensed under the MIT License.

**Made with ❤️**
