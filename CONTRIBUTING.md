# Contribuindo com o Furniro Web

Versão em inglês: [CONTRIBUTING.en.md](CONTRIBUTING.en.md)

Obrigada por seu interesse em contribuir! Este projeto está estruturado para simular um ambiente colaborativo profissional.

## 📦 Como contribuir

1. **Fork o repositório**
2. **Crie uma branch** descritiva:
```bash
   git checkout -b feature/adicionar-filtro-produtos
```
3. **Faça seus commits** seguindo Conventional Commits:
```bash
   git commit -m "feat: adiciona filtro de produtos por categoria"
```
4. **Realize o push** da branch:
```bash
   git push origin feature/adicionar-filtro-produtos
```
5. **Abra um Pull Request** para a branch `main`

---

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- **Node.js** (versão 18+)
- **npm**
- **Git**

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

4. **Em outro terminal, inicie o frontend em modo desenvolvimento:**
```bash
npm run dev
```

---

## 🧪 Antes de enviar

* **Verifique se o projeto builda sem erros:**
```bash
npm run build
```
* **Rode o linter e corrija os apontamentos:**
```bash
npm run lint
```
* **Teste manualmente a aplicação** com o `json-server` rodando teste as funcionalidades do README.md
* **Siga os padrões de código:**
  - Use TypeScript em todos os arquivos
  - Mantenha os componentes pequenos e com responsabilidade única
  - Centralize chamadas de API na camada `services/`
  - Reaproveite os tipos definidos em `models/` em vez de duplicar estruturas
* **Descreva no PR:**
  - **O que foi feito**
  - **Por que foi implementado**
  - **Como testar** (inclua passos e, se necessário, dados de exemplo em `db.json`)
  - **Screenshots ou GIFs** demonstrando a mudança visual, quando aplicável

---

## 💡 Dicas para sugestões

* **Novas funcionalidades:** filtros de produto, persistência de carrinho, páginas adicionais (ex: detalhe do produto)
* **Melhorias de UI/UX:** ajustes de responsividade, acessibilidade e animações
* **Novos testes:** o projeto ainda não possui testes automatizados — contribuições com Vitest/Testing Library são muito bem-vindas
* **Documentação:** melhorias no README ou nos comentários do código
* **Se encontrar um bug:** abra uma Issue com:
  - Descrição detalhada
  - Passos para reproduzir
  - Resultado esperado vs. atual
  - Ambiente (navegador, sistema operacional, versão do Node.js)

---

## ✅ Padrão de nomenclatura de branches

* `feature/nome-da-feature` - Para novas funcionalidades
* `fix/nome-do-bug` - Para correções de bugs
* `docs/nome-da-documentacao` - Para atualizações de documentação
* `test/nome-do-teste` - Para novos testes
* `refactor/nome-da-refatoracao` - Para refatorações
* `style/nome-do-ajuste` - Para ajustes visuais/estilização

---

## 📝 Conventional Commits

Use Conventional Commits para mensagens claras:

* `feat:` - Nova funcionalidade
* `fix:` - Correção de bug
* `docs:` - Mudanças na documentação
* `refactor:` - Refatoração de código
* `test:` - Adição ou correção de testes
* `chore:` - Mudanças em ferramentas, configurações, etc.

**Exemplos:**
```bash
git commit -m "feat: adiciona filtro de produtos por faixa de preço"
git commit -m "fix: corrige validação de e-mail no formulário de newsletter"
git commit -m "docs: atualiza README com novas instruções"
```

---

Para dúvidas, utilize as Issues ou abra uma discussão. Boas contribuições! 🚀