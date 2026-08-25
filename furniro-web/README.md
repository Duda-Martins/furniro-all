# 🛋️ Furniro Web

> 📖 [English version](README.en.md) | Versão em Português

Uma interface de e-commerce de móveis construída com React, TypeScript e Tailwind CSS. O frontend possui integração de autenticação com a API NestJS e mantém o `json-server` como modo mock para o catálogo.

<div align="center">

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red?logo=nestjs)](https://nestjs.com/)

</div>

---

## 📖 Sobre o Projeto

O **Furniro Web** é uma interface de e-commerce de móveis desenvolvida com foco em fidelidade visual, responsividade e boas práticas de organização de código no ecossistema React. O projeto reproduz seções clássicas de uma landing page de loja online, incluindo catálogo de produtos com paginação, carrossel de inspirações, galeria animada e formulário de newsletter.

O projeto foi construído seguindo:

- ✅ **Componentização** - Componentes pequenos, reutilizáveis e com responsabilidade única
- ✅ **Type Safety** - TypeScript em toda a aplicação, incluindo modelos de domínio
- ✅ **Camada de Serviços** - Comunicação com a API isolada em `services/`
- ✅ **Consumo de API Paginada** - Listagem de produtos com scroll incremental ("Show More")
- ✅ **Feedback ao Usuário** - Notificações com `react-toastify` e validação de formulário
- ✅ **Estilização Utilitária** - Tailwind CSS v4 com tema customizado (fontes, animações)
- ✅ **Performance** - React Compiler habilitado via plugin Babel no Vite

---

## ✨ Funcionalidades

- 🖼️ **Hero Section** com chamada para a nova coleção
- 📂 **Browse The Range** - navegação por categorias (Dining, Living, Bedroom) com efeito hover
- 🛍️ **Catálogo de Produtos** com:
    - Carregamento paginado via botão "Show More" (`_page` / `_limit` do json-server)
    - Badges dinâmicas de desconto (`-X%`) e produto novo (`New`, baseado na data de postagem)
    - Overlay no hover com ações de **Share**, **Compare** e **Like**
    - Adição ao carrinho com notificação toast
- 🎠 **Carrossel de Inspiração** (Splide) com slide ativo em destaque, paginação customizada e navegação
- ♾️ **Galeria Infinita** (`#FuniroFurniture`) com scroll horizontal animado via CSS puro
- 📧 **Formulário de Newsletter** com validação de e-mail em tempo real e feedback via toast
- 📱 **Menu responsivo** com hambúrguer para dispositivos móveis
- 🔐 **Autenticação** com login, cadastro e proteção das páginas de checkout e contato
- 🛒 **Carrinho persistente** com Zustand e armazenamento local
- 💳 **Checkout** com validação e consulta de CEP
- 🔗 **Footer completo** com redes sociais, links institucionais e newsletter

---

## 🛠️ Tecnologias

### Core

| Tecnologia       | Versão  | Propósito               |
| ---------------- | ------- | ----------------------- |
| **React**        | ^19.2.7 | Biblioteca de UI        |
| **TypeScript**   | ~6.0.2  | Tipagem estática        |
| **Vite**         | ^8.1.1  | Build tool e dev server |
| **Tailwind CSS** | ^4.3.2  | Estilização utilitária  |

### Bibliotecas

| Biblioteca                 | Versão  | Propósito                             |
| -------------------------- | ------- | ------------------------------------- |
| **@splidejs/react-splide** | ^0.7.12 | Carrossel de imagens                  |
| **react-toastify**         | ^11.1.0 | Notificações toast                    |
| **json-server**            | ^0.17.4 | API REST mockada para desenvolvimento |

### Dev & Qualidade

- **@vitejs/plugin-react** + **@rolldown/plugin-babel** - Integração com o React Compiler
- **@tailwindcss/vite** - Plugin oficial do Tailwind para Vite

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
src/
├── main.tsx                       # Entry point da aplicação
├── App.tsx                        # Composição das seções da página
├── index.css                      # Tema Tailwind, fontes e overrides do Splide/Toastify
├── vite-env.d.ts
├── components/                    # Componentes de UI
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
├── models/                        # Contratos e tipos TypeScript
│   ├── ProductModel.ts
│   ├── ProductCategory.ts
│   ├── ProductFilterModel.ts
│   ├── ProductResponseModel.ts
│   └── slide.ts
├── services/                      # Comunicação com a API
│   ├── api.ts
│   └── ProductService.ts
├── data/                          # Dados estáticos usados pela UI
│   ├── grid.ts
│   └── slides.ts
├── types/
│   └── splide.d.ts                # Tipagem manual do @splidejs/react-splide
└── public/
    ├── img/                        # Imagens de produtos, grid e carrossel
    └── icons/                      # Ícones públicos

db/
└── db.json                        # Base de dados mockada consumida pelo json-server
```

### Fluxo de Dados

```
ProductsSection → ProductService.getProducts() → API configurada em `VITE_API_URL`
    → ProductResponseModel → ProductCard (renderização)
```

O `ProductService` mantém o contrato legado do `json-server`, utilizando `_page`, `_limit`, `_sort`, `_order` e o header `X-Total-Count`. A adaptação completa para os parâmetros da API NestJS permanece como pendência de integração.

---

## 📊 Modelo de Dados

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

**Regras de exibição:**

- Produto exibe badge de desconto quando `discount > 0`
- Produto exibe badge "New" quando postado há menos de 30 dias e sem desconto ativo
- Preço final é calculado em tempo real: `price * (1 - discount / 100)`

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** (versão 18+)
- **npm**

### Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/Duda-Martins/furniro-web2.git
cd furniro-web2
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Inicie a API mockada (json-server):**

```bash
npm run server
```

Isso sobe a API REST em `http://localhost:3000`, servindo os dados de `db/db.json`.

4. **Em outro terminal, inicie o frontend:**

```bash
npm run dev
```

O site estará disponível em `http://localhost:5173` (porta padrão do Vite).

> ⚠️ **Importante:** o frontend depende do json-server rodando em paralelo — sem ele, a listagem de produtos não carrega, pois `ProductService` consome `http://localhost:3000/products`.

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o frontend com Vite (hot reload)
npm run server        # Inicia a API mockada com json-server

# Build & Produção
npm run build         # Type-check (tsc -b) + build de produção com Vite
npm run preview       # Serve o build de produção localmente

# Qualidade de código
npm run lint          # Executa o ESLint
```

---

## 🎨 Design e Estilo

- **Fontes:** Poppins (textos e títulos) e Montserrat, carregadas via Google Fonts
- **Paleta principal:** dourado `#B88E2F` (ações e destaques), cinza-escuro `#3A3A3A` (textos), cinza-claro `#F4F5F7` (fundos de card)
- **Animações customizadas:**
    - `animate-gallery`: scroll horizontal contínuo da galeria `#FuniroFurniture`, definida via `@theme` no Tailwind
    - Transições de hover em cards de produto, ícones sociais e itens do menu "Browse The Range"
- **Carrossel Splide:** estilizado via overrides de classe no `index.css` para reproduzir o slide ativo com dimensões maiores e paginação customizada

---

## 📈 Possíveis Melhorias Futuras

- 🔍 Implementar filtros de produto por categoria, preço e desconto (o `ProductFilterModel` já dá suporte a isso)
- 🔌 Consolidar o `ProductService` com o contrato da API NestJS
- 🧪 Adicionar testes automatizados (unitários e de integração)
- 🌐 Migrar de `json-server` para uma API real em produção

---

## 📝 Licença

Este projeto é protegido pela licença MIT.

**Made with ❤️**
