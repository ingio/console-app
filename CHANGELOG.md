# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- ESLint configuration for code quality enforcement
- ESLint 9 with recommended rules for JavaScript
- Changelog file to track project changes

### Changed
- Updated `@azure/identity` from 3.1.0 to 4.13.0
- Updated `@azure/keyvault-keys` from 4.7.0 to 4.10.0
- Standardized code formatting to 2-space indentation
- Converted all double quotes to single quotes for consistency
- Updated package-lock.json to lockfile version 3

### Fixed
- **Security**: Fixed Azure Identity Libraries Elevation of Privilege Vulnerability (GHSA-m5vv-6r4h-3vj9, CVSS 5.5)
- Fixed 45 ESLint warnings in index.js:
  - 17 quote style inconsistencies
  - 21 indentation issues
  - 3 missing semicolons
  - Removed unused imports: `fs`, `KeyClient`, `DefaultAzureCredential`, `client`
  - Removed commented-out code
  - Simplified error handling in catch blocks

### Security
- Resolved all npm audit vulnerabilities (1 moderate → 0)
- Updated Azure SDK packages to address security advisories

## [1.0.0] - Previous Release

Initial release of console-app with:
- Azure Key Vault integration
- Command-line interface using Commander.js
- Environment variable configuration via dotenv
- Colorized console output
