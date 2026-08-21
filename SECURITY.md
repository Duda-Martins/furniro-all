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

Este projeto segue as melhores práticas de segurança recomendadas para aplicações frontend em React:

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

- ⚠️ **Nota:** Este é um projeto educacional/de portfólio e não implementa autenticação ou autorização
- Em uma aplicação de e-commerce real, recomenda-se a implementação de autenticação (JWT/OAuth2) tanto no frontend quanto em um backend real, além de proteção de rotas sensíveis (checkout, dados do usuário, etc.)

### Outras Medidas

- ✅ Nenhuma informação sensível (chaves, tokens, senhas) é armazenada no código-fonte
- ✅ HTTPS recomendado em produção (junto de um backend real, substituindo o `json-server`)
- ✅ Mensagens de erro exibidas ao usuário são genéricas, sem expor detalhes internos da aplicação

## 📋 Versões suportadas

Atualmente, apenas a versão mais recente (`main`) recebe correções de segurança. Versões anteriores podem conter vulnerabilidades conhecidas.

## 🚨 Responsabilidades

- **Mantenedora:** Maria Eduarda Martins Rodrigues
- **Contato:** mrodrigues.mariaeduarda@gmail.com

---

Obrigada por ajudar a tornar este projeto mais seguro e confiável para todos!
