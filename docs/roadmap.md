# 🗺️ Roadmap de Implementação — Furniro

---

## 📦 Estado Atual do Projeto

### Roteamento — `src/App.tsx`

Rotas existentes:

| Rota | Página | Proteção |
|---|---|---|
| `/` | `Home` | pública |
| `/shop` | `Shop` | pública |
| `/shop/:category` | `Shop` | pública |
| `/product/:slug` | `Product` | pública |
| `/cart` | `Cart` | pública |
| `*` | `NotFound` | — |

- `/contact` e `/about` já existem no `Nav` mas não têm página — caem no `NotFound`.
- Não há nenhum sistema de autenticação ainda.

---

### Carrinho — `src/store/cartStore.ts`

Store Zustand com persistência em `localStorage` (chave `"furniro-cart"`).

Funções exportadas prontas para reutilizar:

| Função | O que faz |
|---|---|
| `useCartStore` | Hook principal do store |
| `getCartTotal(items)` | Soma total do carrinho |
| `getCartCount(items)` | Quantidade total de itens |
| `getSubtotal(item)` | Subtotal de um item (preço × quantidade, com desconto) |
| `getUnitPrice(item)` | Preço unitário com desconto aplicado |
| `getFullPrice(item)` | Preço sem desconto |

Tipos exportados: `CartItem`, `CartVariant`.

Ações disponíveis no store: `addItem`, `removeItem`, `updateQuantity`, `clear`.

---

### Página Cart — `src/pages/Cart.tsx`

- Tabela completa de itens com imagem, nome, variante, preço, quantidade (`Increaser`) e remoção.
- Usa `CartTotals` para exibir subtotal/total e o botão de checkout.
- **O botão "Check Out" atualmente só dispara um `toast.success` — não navega para nenhuma página.** Isso será corrigido na Fase 5.

---

### Componentes reutilizáveis relevantes

| Componente | Localização | O que faz |
|---|---|---|
| `Container` | `components/Container.tsx` | Wrapper com `max-w-content` e padding padrão |
| `BannerContainer` | `components/BannerContainer.tsx` | Banner de topo com título e breadcrumb |
| `CartButton` | `components/CartButton.tsx` | Botão outline com toast opcional |
| `CartTotals` | `components/CartTotals.tsx` | Aside com subtotal, total e botão de checkout — recebe `onCheckout: () => void` |
| `Increaser` | `components/Increaser.tsx` | Controle de quantidade +/− com min/max |
| `FeaturesSection` | `components/FeaturesSection.tsx` | Seção de features usada no Cart e Product |
| `Layout` | `components/Layout.tsx` | Header + `<Outlet />` + Footer |
| `BannerContainer` | `components/BannerContainer.tsx` | Aceita `title`, `crumbs[]`, `image` opcional |

---

### Header e Nav

- `Header` → `Nav` + `UserAndCartIcon`, sticky no topo (`z-50`).
- `Nav` — links existentes: Home `/`, Shop `/shop`, About `/about`, Contact `/contact`. O menu mobile já está implementado.
- `UserAndCartIcon`:
  - Ícone de usuário: atualmente é `<a href="#">` — **não linka para nada**.
  - Ícone de carrinho: atualmente navega para `/cart` via `<Link>` — **será alterado para abrir o sidebar**.
  - Exibe badge com contagem de itens usando `getCartCount`.

---

### Cliente HTTP — `src/api/api.ts`

Wrapper de `fetch` com `Content-Type: application/json` e tratamento de erro. Lê a URL base de `VITE_API_URL` (`.env`) com fallback para `http://localhost:3000`.

> ⚠️ Existe também `src/services/api.ts` que exporta apenas `API_URL` como string — é uma duplicidade. Será removido na Fase 7.

---

### Backend — O que existe

Módulos ativos: `product` e `category`.

Arquitetura em camadas: `Controller → Service → Repository → TypeORM → SQLite`.

**Não existe nenhum módulo de autenticação, usuário ou pedido.** Tudo isso será criado na Fase 1.

---

### Estilização

- Tailwind CSS v4 — configuração via `@theme` no `src/index.css`, **não há `tailwind.config.js`**.
- Fontes: `Poppins` e `Montserrat` (Google Fonts, importadas no CSS).
- Cor primária: `#B88E2F`.
- Toasts: `react-toastify` já configurado no `App.tsx` com estilo customizado.
- `formatPrice(value)` em `src/utils/formatPrice.ts` — formata como `Rp 2.500`.

---

## Sequência de Implementação

```
Fase 1 (Backend Auth)
    └── Fase 2 (Frontend Auth infra)
            ├── Fase 3 (Login/Cadastro)
            │       ├── Fase 5 (Checkout)
            │       └── Fase 6 (Contact)
            └── Fase 4 (Cart Sidebar) ← independente, pode rodar em paralelo com Fase 3
```

---

## Fase 1 — Backend: Autenticação

> Tudo que depende de login precisa do backend pronto primeiro. O backend atual só tem `product` e `category` — nenhum módulo de usuário ou auth existe ainda.

### 1.1 Módulo `user`
- Criar entidade `User` com campos: `id`, `name`, `email`, `password` (hash)
- Seguir o mesmo padrão dos módulos existentes: `UserEntity`, `UserRepository`, `UserService`, `UserModule`
- Endpoint `POST /users` — cadastro de novo usuário
- Hash da senha com `bcrypt` antes de persistir

### 1.2 Módulo `auth`
- Instalar dependências (ver seção de instalações no final)
- Endpoint `POST /auth/login` — valida credenciais e retorna JWT
- `JwtStrategy` para validar o token nas rotas protegidas
- `JwtAuthGuard` para proteger endpoints futuros
- O token deve conter pelo menos `{ sub: userId, email }`

---

## Fase 2 — Frontend: Infraestrutura de Auth

> Antes de criar qualquer página protegida, o cliente precisa saber gerenciar o token. O `cartStore.ts` é o modelo a seguir para criar o `authStore`.

### 2.1 `src/store/authStore.ts` (Zustand)
- Seguir o mesmo padrão do `cartStore`: `create` + `persist` + `createJSONStorage(() => localStorage)`
- Estado: `user` (nome e email), `token`, `isAuthenticated`
- Ações: `login(token, user)`, `logout()`
- Chave no localStorage: `"furniro-auth"`

### 2.2 Atualizar `src/api/api.ts`
- O cliente HTTP atual não envia autenticação — adicionar leitura do token do `authStore`
- Incluir header `Authorization: Bearer <token>` quando o token existir
- Tratar resposta `401` chamando `authStore.logout()` automaticamente

### 2.3 Componente `ProtectedRoute`
- Criar em `src/components/ProtectedRoute.tsx`
- Lê `isAuthenticated` do `authStore`
- Se não autenticado: `<Navigate to="/login" state={{ from: location }} replace />`
- O `state.from` permite redirecionar de volta após o login

### 2.4 Instalar dependências de formulário
```bash
# dentro de furniro-web/
npm install react-hook-form zod @hookform/resolvers
```

---

## Fase 3 — Login / Cadastro

> Necessário antes de qualquer rota protegida funcionar no frontend. O `ProtectedRoute` da Fase 2 já redireciona para `/login` — essa fase cria a página de destino.

### 3.1 Página `src/pages/Login.tsx`
- Rota pública: `/login`
- Reutiliza `BannerContainer` (título "Login"), `Container`, `FeaturesSection`
- Formulário com `react-hook-form` + `zod`: campos `email` e `password`
- **Sem `alert()` ou atributo `required` HTML** — erros exibidos inline abaixo de cada campo
- Ao fazer login com sucesso: salva token no `authStore` e redireciona para `state.from` (rota de origem) ou `/`
- Link para `/register`

### 3.2 Página `src/pages/Register.tsx`
- Rota pública: `/register`
- Reutiliza `BannerContainer`, `Container`, `FeaturesSection`
- Formulário com `react-hook-form` + `zod`: campos `name`, `email`, `password`, `confirmPassword`
- Após cadastro com sucesso: redireciona para `/login`

### 3.3 Logout e ícone de usuário
- O ícone de usuário em `UserAndCartIcon.tsx` atualmente é `<a href="#">` — alterar para:
  - `<Link to="/login">` se `!isAuthenticated`
  - Botão que chama `authStore.logout()` + `navigate("/")` se `isAuthenticated`

### 3.4 Atualizar `src/App.tsx`
- Adicionar rotas `/login` e `/register` dentro do `<Route path="/" element={<Layout />}>`
- Envolver `/checkout` e `/contact` com `<ProtectedRoute>`:
```tsx
<Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
<Route path="contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
```

---

## Fase 4 — Cart Sidebar

> Depende apenas do `cartStore` que já existe — pode ser desenvolvido em paralelo com a Fase 3. Todas as funções de cálculo (`getSubtotal`, `getUnitPrice`, `getCartTotal`) e o tipo `CartItem` já estão prontos para uso.

### 4.1 Componente `src/components/CartSidebar.tsx`
- Overlay escuro + painel lateral direito (conforme Figma)
- Lista os itens do carrinho: imagem (`/img/products/${item.product.image}`), nome, variante, preço unitário, botão de remover
- Scroll interno quando há muitos produtos (altura limitada conforme Figma)
- Total do carrinho usando `getCartTotal`
- Botões no rodapé:
  - "Cart" → `<Link to="/cart">` + fecha o sidebar
  - "Checkout" → `navigate("/checkout")` (o `ProtectedRoute` cuida do redirect para login se necessário)
- Reutiliza: `useCartStore`, `getSubtotal`, `getUnitPrice`, `getCartTotal`, `formatPrice`
- Recebe props: `isOpen: boolean`, `onClose: () => void`

### 4.2 Estado de abertura do Sidebar
- Adicionar ao `cartStore` existente (ou criar store separado) a flag `isSidebarOpen` com ações `openSidebar()` e `closeSidebar()`

### 4.3 Atualizar `src/components/UserAndCartIcon.tsx`
- O ícone de carrinho (`<Link to="/cart">`) deve ser alterado para um `<button>` que chama `openSidebar()`
- O badge de contagem já existe e continua funcionando

### 4.4 Atualizar `src/components/Layout.tsx`
- O `Layout` atual é simples: `Header + Outlet + Footer`
- Adicionar `<CartSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />` antes do `Footer`
- O `Header` precisa receber (ou o `UserAndCartIcon` lê diretamente do store) o handler de abertura

---

## Fase 5 — Checkout

> Depende da Fase 2 (ProtectedRoute) e da Fase 3 (Login). O `CartTotals` e o `Cart.tsx` já existem e precisam de pequenas alterações.

### 5.1 Página `src/pages/Checkout.tsx`
- Rota protegida: `/checkout`
- Reutiliza `BannerContainer` (título "Checkout"), `Container`, `FeaturesSection`, `formatPrice`, `useCartStore`
- Layout conforme Figma: formulário de billing à esquerda, resumo do pedido à direita
- Formulário com `react-hook-form` + `zod`:
  - Campos obrigatórios: First Name, Last Name, ZIP Code, Country/Region, Street Address, Town/City, Province, Email, Phone
  - Campos opcionais: Company Name, Add-on Address
  - Seleção de método de pagamento — obrigatório antes de "Place Order"
- **Campo ZIP Code integrado com ViaCEP** (`https://viacep.com.br/ws/{cep}/json/`):
  - Ao preencher 8 dígitos, busca automaticamente e preenche: Country/Region (`"Brasil"`), Street Address (`logradouro`), Town/City (`localidade`), Province (`uf`)
  - Usar `setValue` do `react-hook-form` para preencher os campos
- Ao clicar em "Place Order": `toast.success(...)` e `cartStore.clear()`
- **Sem `alert()` ou atributo `required` HTML**

### 5.2 Atualizar `src/pages/Cart.tsx`
- O `handleCheckout` atual dispara um `toast.success` — substituir por `navigate("/checkout")`
- O `CartTotals` já recebe `onCheckout: () => void`, basta trocar a implementação

---

## Fase 6 — Contact

> Depende da Fase 2 (ProtectedRoute) e da Fase 3 (Login). O link `/contact` já existe no `Nav.tsx` — só falta a página e a rota.

### 6.1 Página `src/pages/Contact.tsx`
- Rota protegida: `/contact`
- Reutiliza `BannerContainer` (título "Contact"), `Container`, `FeaturesSection`
- Formulário com `react-hook-form` + `zod`:
  - "Your name" — obrigatório
  - "Email address" — obrigatório, formato de email válido
  - Demais campos — opcionais, sem validação obrigatória
- Ao clicar em "Submit": `toast.success(...)`
- **Sem `alert()` ou atributo `required` HTML**

### 6.2 Rota já preparada na Fase 3
- O `Nav.tsx` já tem `<Link to="/contact">` — nenhuma alteração necessária aqui.
- A rota protegida já terá sido adicionada ao `App.tsx` na Fase 3.

---

## Fase 7 — Ajustes Finais

### 7.1 Branches por funcionalidade
Criar antes de iniciar cada fase:
- `feature/auth-backend`
- `feature/auth-frontend`
- `feature/login-register`
- `feature/cart-sidebar`
- `feature/checkout`
- `feature/contact`

### 7.2 Limpeza e consistência
- Remover `src/services/api.ts` (exporta só `API_URL` como string) — centralizar tudo em `src/api/api.ts`
- Garantir responsividade em todas as novas páginas
- Confirmar que nenhum formulário usa `alert()` ou atributo `required` HTML

---

## Novas instalações necessárias

### Frontend (`furniro-web/`)
```bash
npm install react-hook-form zod @hookform/resolvers
```

### Backend (`furniro-back-end/`)
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt @types/bcrypt
```
