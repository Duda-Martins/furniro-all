# 🔧 Furniro Backend

> 📖 [Portuguese version](README.md) | English Version

REST API for Furniro, a furniture e-commerce application built with **NestJS**, **TypeScript**, **TypeORM**, and **SQLite**.

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?logo=typescript)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3-E83524)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)

</div>

---

## 📖 About the Project

The backend provides the catalog, category, user, and authentication resources for the Furniro application. The API follows a layered architecture, separating controllers, business rules, repositories, entities, and DTOs.

The application was designed with a focus on:

- ✅ REST API with NestJS
- ✅ Layered architecture
- ✅ Static typing with TypeScript
- ✅ SQLite persistence with TypeORM
- ✅ Data validation with DTOs
- ✅ JWT authentication
- ✅ Database seed

---

## ✨ Features

- 🛍️ Product listing and lookup
- 🔍 Filtering by name, category, price, and discount
- 📄 Catalog pagination and sorting
- 🗂️ Product categories
- 👤 User registration and management
- 🔐 Login with a JWT token
- 🌱 Seeding of categories, products, variants, and attributes

---

## 🏗️ Architecture

```text
Controller
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
TypeORM
     │
     ▼
SQLite
```

### Folder structure

```text
src/
├── auth/             # Login, JWT, and authentication strategies
├── category/         # Categories
├── database/         # Database seed
├── product/          # Products, filters, DTOs, and repository
├── user/             # Users and registration
├── app.module.ts
└── main.ts
```

---

## 🚀 Setup

### Prerequisites

- **Node.js** (version 18+)
- **npm**
- **JWT_SECRET** set as an environment variable

### Installation

From the `furniro-back-end/` folder:

```bash
npm install
```

Configure the secret used for authentication:

```env
JWT_SECRET=your-local-secret
```

---

## ▶️ Running the Project

```bash
npm run seed
npm run start:dev
```

The API will be available at `http://localhost:3000`.

To run the frontend and backend together, use the following command from the repository root:

```bash
docker compose up --build
```

Docker Compose runs the seed automatically and makes the frontend available at `http://localhost:5173`.

---

## 🌐 REST API

### Endpoints

| Method   | Endpoint             | Description                            |
| -------- | -------------------- | -------------------------------------- |
| `GET`    | `/`                  | Checks whether the API is running      |
| `GET`    | `/products`          | Lists products                         |
| `GET`    | `/products/:id/slug` | Gets product details                   |
| `GET`    | `/users`             | Lists users                            |
| `GET`    | `/users/:id`         | Gets a user by ID                      |
| `GET`    | `/users/:email`      | Gets a user by email                   |
| `POST`   | `/users`             | Registers a user                       |
| `PUT`    | `/users/:id`         | Updates a user                         |
| `DELETE` | `/users/:id`         | Deletes a user                         |
| `POST`   | `/auth/login`        | Authenticates a user and returns a JWT |

### Product filters

The `GET /products` endpoint accepts `name`, `category`, `minPrice`, `maxPrice`, `hasDiscount`, `page`, `limit`, `sortBy`, and `order`.

Accepted values for `sortBy` are `price`, `name`, and `postedAt`. Accepted values for `order` are `asc` and `desc`.

Example:

```http
GET /products?category=Dining&minPrice=500&maxPrice=1000&page=1&limit=8
```

The paginated response has the following format:

```json
{
  "data": [],
  "total": 0,
  "page": 1,
  "limit": 8
}
```

---

## 🧪 Available Scripts

| Script               | Description                        |
| -------------------- | ---------------------------------- |
| `npm run start`      | Starts the application             |
| `npm run start:dev`  | Starts development mode with watch |
| `npm run start:prod` | Runs the compiled version          |
| `npm run build`      | Compiles the project               |
| `npm run seed`       | Populates the database             |
| `npm run lint`       | Runs ESLint                        |
| `npm run test`       | Runs unit tests                    |
| `npm run test:e2e`   | Runs End-to-End tests              |
| `npm run test:cov`   | Generates the coverage report      |

---

## 📊 Database

The project uses SQLite. The seed creates categories, products, variants, attributes, and their relationships.

`JWT_SECRET` must be kept only in the runtime environment and must never be committed.
