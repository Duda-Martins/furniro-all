# Security Policy

Portuguese version: [SECURITY.md](SECURITY.md)

Thank you for contributing to the security of the **Furniro Web** project!

## 🛡 Reporting Vulnerabilities

If you discover a security vulnerability or issue, please follow these guidelines:

1. **Do not open a public issue.**
2. Send an email to **[mrodrigues.mariaeduarda@gmail.com](mailto:mrodrigues.mariaeduarda@gmail.com)** with the subject: **[SECURITY] Furniro Web**.
3. Include:
    - A detailed description of the vulnerability;
    - Steps to reproduce the issue;
    - The estimated impact;
    - A possible fix (optional).

## 🔐 Implemented Security Best Practices

This project follows recommended security best practices for React frontend applications.

### Validation and Sanitization

- ✅ Email validation is performed on the newsletter subscription form before submission.
- ✅ Strict TypeScript typing is used across models, services, and components.
- ✅ Dynamic content is rendered through JSX, which automatically escapes interpolated strings (React's built-in protection against basic XSS attacks).

### API Consumption

- ✅ API requests are centralized in the `services/` layer (`ProductService`), avoiding scattered requests throughout components.
- ✅ Error responses (`response.ok`) are checked before processing returned data.

### Dependencies

- ✅ Compatible package versions are managed through `package.json`.
- 🔄 Running `npm audit` periodically is recommended to identify vulnerabilities in third-party dependencies.

### Authentication and Authorization

- ⚠️ **Note:** This is an educational/portfolio project and does not implement authentication or authorization.
- In a real-world e-commerce application, authentication (JWT/OAuth2) should be implemented on both the frontend and backend, along with proper protection for sensitive routes (checkout, user data, etc.).

### Additional Security Measures

- ✅ No sensitive information (API keys, tokens, or passwords) is stored in the source code.
- ✅ HTTPS is recommended in production (along with a real backend replacing `json-server`).
- ✅ Error messages displayed to users are generic and do not expose internal application details.

## 📋 Supported Versions

Currently, only the latest version (`main`) receives security updates. Previous versions may contain known vulnerabilities.

## 🚨 Responsibilities

- **Maintainer:** Maria Eduarda Martins Rodrigues
- **Contact:** [mrodrigues.mariaeduarda@gmail.com](mailto:mrodrigues.mariaeduarda@gmail.com)

---

Thank you for helping make this project more secure and reliable for everyone!
