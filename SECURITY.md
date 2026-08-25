# Política de Segurança

Versão em inglês: [SECURITY.en.md](SECURITY.en.md)

Obrigada por contribuir com a segurança do projeto **Furniro Web**!

## 🛡 Como relatar vulnerabilidades

Caso você identifique alguma vulnerabilidade ou falha de segurança, siga estas orientações:

1. **Não abra uma issue pública.**
2. Envie um e-mail para mrodrigues.mariaeduarda@gmail.com com o título: **[SECURITY] Furniro Web**.
3. Inclua:
    - Descrição detalhada da falha;
    - Passos para reproduzir;
    - Impacto estimado;
    - Possível correção (opcional).

## 🔐 Boas práticas de segurança implementadas

Este projeto segue práticas de segurança para o frontend React e o backend NestJS:

### Validações e Sanitização

- ✅ Validação de e-mail no formulário de newsletter antes do envio
- ✅ Tipagem estrita com TypeScript em modelos, serviços e componentes
- ✅ Renderização de conteúdo dinâmico via JSX, que escapa automaticamente strings interpoladas (proteção nativa do React contra XSS básico)

### Consumo de API

- ✅ Requisições centralizadas na camada `services/` (`ProductService`), evitando chamadas soltas espalhadas pelos componentes
- ✅ Tratamento de respostas de erro (`response.ok`) antes de consumir os dados

### Dependências

- ✅ Uso de versões fixas/compatíveis via `package.json`
- 🔄 Recomenda-se rodar `npm audit` periodicamente para identificar vulnerabilidades em dependências de terceiros

### Autenticação e Autorização

- ✅ Login em `POST /auth/login` com token JWT
- ✅ Cadastro em `POST /users`
- ✅ `ProtectedRoute` protege as páginas `/checkout` e `/contact` no frontend
- ✅ O backend possui `JwtStrategy` e `JwtAuthGuard` para rotas protegidas
- ⚠️ O projeto é educacional/de portfólio; o checkout ainda não persiste pedidos no backend
- 🔐 O backend exige a variável `JWT_SECRET`, que deve ser fornecida por ambiente e nunca versionada

### Outras Medidas

- ✅ Nenhuma informação sensível (chaves, tokens, senhas) é armazenada no código-fonte
- ✅ HTTPS recomendado em produção
- ✅ Mensagens de erro exibidas ao usuário são genéricas, sem expor detalhes internos da aplicação

## 📋 Versões suportadas

Atualmente, apenas a versão mais recente (`main`) recebe correções de segurança. Versões anteriores podem conter vulnerabilidades conhecidas.

## 🚨 Responsabilidades

- **Mantenedora:** Maria Eduarda Martins Rodrigues
- **Contato:** mrodrigues.mariaeduarda@gmail.com

---

Obrigada por ajudar a tornar este projeto mais seguro e confiável para todos!
