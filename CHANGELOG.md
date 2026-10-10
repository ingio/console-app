# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Azure Resource Group listing functionality
- `@azure/arm-resources` package (v7.0.0) for Azure resource management
- `cli-table3` package (v0.6.5) for formatted table output
- Table display showing resource group name, location, status, and tags
- Support for `AZURE_SUBSCRIPTION_ID` environment variable
- Azure authentication using ClientSecretCredential
- ESLint configuration for code quality enforcement
- ESLint 9 with recommended rules for JavaScript
- Changelog file to track project changes
- `.nvmrc` and `engines.node >=24` pinning the project to Node.js 24 LTS (Krypton)
- `@eslint/js` dev dependency; ESLint now actually applies the recommended rule set
- `npm run lint` and `npm run lint:fix` scripts
- `subscriptions` command listing all subscriptions in the tenant (name, subscription ID, state)
- `list --subscription <id>` (`-s`) option to limit the listing to a single subscription
- `@azure/arm-resources-subscriptions` package (v3.0.0) for subscription lookup

### Changed
- Enhanced `list` command to fetch and display Azure resource groups instead of just validating credentials
- Updated credential validation to include subscription ID requirement
- Improved error messages with better formatting and instructions
- Updated `@azure/identity` from 3.1.0 to 4.13.0
- Updated `@azure/keyvault-keys` from 4.7.0 to 4.10.0
- Standardized code formatting to 2-space indentation
- Converted all double quotes to single quotes for consistency
- Updated package-lock.json to lockfile version 3
- ESLint `ecmaVersion` set to `latest`
- `list` output now shows the subscription name and ID above each resource group table
- `list` now lists resource groups across all subscriptions in the tenant by default
- README updated for new commands and Node.js 24 LTS prerequisite
- Updated dependencies within semver ranges: `@azure/identity` 4.13.3, `@azure/keyvault-keys` 4.10.2, `dotenv` 17.4.2, `eslint` 10.12.0, `inquirer` 13.4.3, `ora` 9.4.1

### Removed
- `AZURE_SUBSCRIPTION_ID` environment variable — no longer needed; subscriptions are discovered from the tenant

### Fixed
- App crashed on startup with `TypeError: program.command is not a function` — commander v14 exports `{ program }`, not a default instance
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
- Fixed 3 npm audit vulnerabilities (2 moderate, 1 high — `brace-expansion` DoS advisories) via `npm audit fix`

## [1.0.0] - Previous Release

Initial release of console-app with:
- Azure Key Vault integration
- Command-line interface using Commander.js
- Environment variable configuration via dotenv
- Colorized console output
