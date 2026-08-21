# Contributing to Furniro Web

Portuguese version: [CONTRIBUTING.md](CONTRIBUTING.md)

Thank you for your interest in contributing! This project is structured to simulate a professional collaborative development environment.

## 📦 How to Contribute

1. **Fork the repository.**
2. **Create a descriptive branch:**

```bash
git checkout -b feature/add-product-filters
```

3. **Commit your changes** following the Conventional Commits specification:

```bash
git commit -m "feat: add product category filter"
```

4. **Push your branch:**

```bash
git push origin feature/add-product-filters
```

5. **Open a Pull Request** targeting the `main` branch.

---

## 🛠️ Environment Setup

### Prerequisites

- **Node.js** (version 18 or later)
- **npm**
- **Git**

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Duda-Martins/furniro-web2.git
cd furniro-web2
```

2. **Install the dependencies:**

```bash
npm install
```

3. **Start the mock API (json-server):**

```bash
npm run server
```

4. **In another terminal, start the frontend in development mode:**

```bash
npm run dev
```

---

## 🧪 Before Submitting

- **Make sure the project builds successfully:**

```bash
npm run build
```

- **Run the linter and fix any reported issues:**

```bash
npm run lint
```

- **Manually test the application** with `json-server` running and verify the features described in the `README.md`.

- **Follow the project's coding standards:**
    - Use TypeScript in all files.
    - Keep components small and focused on a single responsibility.
    - Centralize API calls in the `services/` layer.
    - Reuse the types defined in `models/` instead of duplicating data structures.

- **Describe the following in your Pull Request:**
    - **What was implemented**
    - **Why it was implemented**
    - **How to test it** (include steps and, if necessary, sample data for `db.json`)
    - **Screenshots or GIFs** demonstrating visual changes, when applicable

---

## 💡 Suggestions for Contributions

- **New features:** product filters, cart persistence, additional pages (e.g., product details)
- **UI/UX improvements:** responsive design, accessibility, and animations
- **New tests:** the project does not yet include automated tests—contributions using Vitest and Testing Library are highly appreciated
- **Documentation:** improvements to the README or code comments
- **If you find a bug:** open an Issue including:
    - A detailed description
    - Steps to reproduce
    - Expected vs. actual behavior
    - Environment information (browser, operating system, Node.js version)

---

## ✅ Branch Naming Convention

- `feature/feature-name` — New features
- `fix/bug-name` — Bug fixes
- `docs/documentation-name` — Documentation updates
- `test/test-name` — New or updated tests
- `refactor/refactor-name` — Code refactoring
- `style/style-update` — Visual or styling changes

---

## 📝 Conventional Commits

Use Conventional Commits to keep commit messages clear and consistent:

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `refactor:` — Code refactoring
- `test:` — Adding or updating tests
- `chore:` — Changes to tooling, configuration, and maintenance tasks

**Examples:**

```bash
git commit -m "feat: add product price range filter"
git commit -m "fix: correct newsletter email validation"
git commit -m "docs: update README with new setup instructions"
```

---

If you have any questions, feel free to open an Issue or start a discussion. Happy contributing! 🚀
