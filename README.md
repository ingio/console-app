# Console App

A Node.js command-line application for managing Azure resources. Currently supports listing Azure resource groups in a formatted table.

## Features

- List all Azure resource groups in your subscription
- Display results in a formatted table with:
  - Resource group name
  - Location (Azure region)
  - Provisioning status
  - Tags
- Authentication via Azure Service Principal (Client Secret)

## Prerequisites

- Node.js (v14 or later)
- Azure subscription
- Azure Service Principal with appropriate permissions to read resource groups.  
  Make use of Entra ID to GitHub federation to skip ising any secrets.

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the project root with your Azure credentials:

```bash
AZURE_CLIENT_ID=<your-service-principal-id>
AZURE_CLIENT_SECRET=<your-service-principal-secret> # if not federated
AZURE_TENANT_ID=<your-azure-tenant-id>
AZURE_SUBSCRIPTION_ID=<your-azure-subscription-id>
```

## Usage

List all resource groups:

```bash
node index.js list
```

## Example Output

```
Authenticating with Azure...
Fetching resource groups...

Found 3 resource group(s):

┌────────────────────────────┬──────────────────┬───────────────┬────────────────────────────────────────┐
│ Name                       │ Location         │ Status        │ Tags                                   │
├────────────────────────────┼──────────────────┼───────────────┼────────────────────────────────────────┤
│ my-app-rg                  │ eastus           │ Succeeded     │ environment:production, team:devops    │
├────────────────────────────┼──────────────────┼───────────────┼────────────────────────────────────────┤
│ test-rg                    │ westus2          │ Succeeded     │ environment:test                       │
├────────────────────────────┼──────────────────┼───────────────┼────────────────────────────────────────┤
│ demo-resources             │ centralus        │ Succeeded     │ None                                   │
└────────────────────────────┴──────────────────┴───────────────┴────────────────────────────────────────┘
```

## Development

This project also serves as a test bed for GitHub Advanced Security and Dependabot features.
