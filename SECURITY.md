# Security Policy

## Supported Versions

This project is currently in active development. Security updates are applied to the latest version.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Testing and Code Quality

This project implements multiple security and code quality measures:

### Automated Security Scanning

#### CodeQL Analysis
- **Automated static analysis** runs on every push and pull request to the main branch
- **Weekly scheduled scans** every Friday at 11:40 UTC
- Analyzes JavaScript code for security vulnerabilities
- Configuration: `.github/workflows/codeql-analysis.yml`

#### Dependabot
- Automatically monitors dependencies for known vulnerabilities
- Creates pull requests to update vulnerable packages
- Tracks both direct and transitive dependencies

### Manual Security Checks

#### Linting with ESLint
Run code quality checks using ESLint 9:

```bash
# Check for linting issues
npx eslint index.js

# Lint all JavaScript files
npx eslint .

# Auto-fix issues where possible
npx eslint index.js --fix
```

#### Vulnerability Scanning with npm audit
Check for security vulnerabilities in dependencies:

```bash
# Check for vulnerabilities
npm audit

# Show detailed vulnerability report
npm audit --json

# Automatically fix vulnerabilities (updates packages)
npm audit fix

# Fix vulnerabilities including breaking changes (use with caution)
npm audit fix --force
```

### Security Best Practices

This project follows these security practices:

1. **Credential Management**: All sensitive credentials are stored in `.env` files (never committed to git)
2. **Dependency Updates**: Regular updates to Azure SDK packages and other dependencies
3. **Least Privilege**: Service principals should be configured with minimum required permissions
4. **Secret Scanning**: GitHub secret scanning is enabled to detect accidentally committed secrets

## Reporting a Vulnerability

If you discover a security vulnerability in this project:

1. **Do NOT** open a public issue
2. Email the maintainer directly or use GitHub's private vulnerability reporting feature
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Every 7 days until resolved
- **Fix Timeline**: Critical issues within 7 days, others within 30 days

### What to Expect

- **Accepted vulnerabilities**: Will be fixed, documented in CHANGELOG.md, and credited to the reporter (unless anonymity is requested)
- **Declined reports**: Will receive an explanation of why the issue is not considered a vulnerability
