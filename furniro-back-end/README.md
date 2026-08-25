# 🔧 Furniro Backend

> 📖 [English version](README.en.md) | Versão em Português

API REST do Furniro, um e-commerce de móveis desenvolvido com **NestJS**, **TypeScript**, **TypeORM** e **SQLite**.

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?logo=typescript)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3-E83524)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)

</div>

---

## 📖 Sobre o Projeto

O backend fornece os recursos de catálogo, categorias, usuários e autenticação da aplicação Furniro. A API segue uma arquitetura em camadas, separando controladores, regras de negócio, repositórios, entidades e DTOs.

A aplicação foi construída priorizando:

- ✅ API REST com NestJS
- ✅ Arquitetura em camadas
- ✅ Tipagem estática com TypeScript
- ✅ Persistência com SQLite e TypeORM
- ✅ Validação de dados com DTOs
- ✅ Autenticação com JWT
- ✅ Seed para popular o banco de dados

---

## ✨ Funcionalidades

- 🛍️ Listagem e consulta de produtos
- 🔍 Filtros por nome, categoria, preço e desconto
- 📄 Paginação e ordenação do catálogo
- 🗂️ Categorias de produtos
- 👤 Cadastro e gerenciamento de usuários
- 🔐 Login com token JWT
- 🌱 Seed de categorias, produtos, variantes e atributos

---

## 🏗️ Arquitetura

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

### Estrutura de pastas

```text
src/
├── auth/             # Login, JWT e estratégias de autenticação
├── category/         # Categorias
├── database/         # Seed do banco de dados
├── product/          # Produtos, filtros, DTOs e repositório
├── user/             # Usuários e cadastro
├── app.module.ts
└── main.ts
```

---

## 🚀 Configuração

### Pré-requisitos

- **Node.js** (versão 18+)
- **npm**
- **JWT_SECRET** definido como variável de ambiente

### Instalação

Dentro da pasta `furniro-back-end/`:

```bash
npm install
```

Configure o segredo usado na autenticação:

```env
JWT_SECRET=seu-segredo-local
```

---

## ▶️ Execução

```bash
npm run seed
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

Para executar frontend e backend juntos, use na raiz do projeto:

```bash
docker compose up --build
```

O Docker Compose executa a seed automaticamente e disponibiliza o frontend em `http://localhost:5173`.

---

## 🌐 API REST

### Endpoints

| Método   | Endpoint             | Descrição                             |
| -------- | -------------------- | ------------------------------------- |
| `GET`    | `/`                  | Verifica se a API está funcionando    |
| `GET`    | `/products`          | Lista produtos                        |
| `GET`    | `/products/:id/slug` | Consulta os detalhes de um produto    |
| `GET`    | `/users`             | Lista usuários                        |
| `GET`    | `/users/:id`         | Consulta um usuário por ID            |
| `GET`    | `/users/:email`      | Consulta um usuário por e-mail        |
| `POST`   | `/users`             | Cadastra um usuário                   |
| `PUT`    | `/users/:id`         | Atualiza um usuário                   |
| `DELETE` | `/users/:id`         | Remove um usuário                     |
| `POST`   | `/auth/login`        | Autentica um usuário e retorna um JWT |

### Filtros de produtos

O endpoint `GET /products` aceita os parâmetros `name`, `category`, `minPrice`, `maxPrice`, `hasDiscount`, `page`, `limit`, `sortBy` e `order`.

Os valores aceitos para `sortBy` são `price`, `name` e `postedAt`. Para `order`, são `asc` e `desc`.

Exemplo:

```http
GET /products?category=Dining&minPrice=500&maxPrice=1000&page=1&limit=8
```

A resposta paginada possui o formato:

```json
{
  "data": [],
  "total": 0,
  "page": 1,
  "limit": 8
}
```

---

## 🧪 Scripts Disponíveis

| Script               | Descrição                                |
| -------------------- | ---------------------------------------- |
| `npm run start`      | Inicia a aplicação                       |
| `npm run start:dev`  | Inicia em modo desenvolvimento com watch |
| `npm run start:prod` | Executa a versão compilada               |
| `npm run build`      | Compila o projeto                        |
| `npm run seed`       | Popula o banco de dados                  |
| `npm run lint`       | Executa o ESLint                         |
| `npm run test`       | Executa os testes unitários              |
| `npm run test:e2e`   | Executa os testes End-to-End             |
| `npm run test:cov`   | Gera o relatório de cobertura            |

---

## 📊 Banco de Dados

O projeto utiliza SQLite como banco de dados. A seed cadastra categorias, produtos, variantes, atributos e suas relações.

O arquivo `JWT_SECRET` deve ser mantido somente no ambiente de execução e nunca versionado.
