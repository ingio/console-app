# Console App

A Node.js command-line application for managing Azure resources. Supports listing the subscriptions in your tenant and the resource groups in one or all subscriptions, in formatted tables.

## Features

- List all subscriptions in the tenant (name, subscription ID, state)
- List Azure resource groups across every subscription in the tenant (or one, with `--subscription`)
- Each resource group table is headed by the subscription name and ID
- Display results in a formatted table with:
  - Resource group name
  - Location (Azure region)
  - Provisioning status
  - Tags
- Authentication via Azure Service Principal (Client Secret)

## Prerequisites

- Node.js 24 LTS or later (see `.nvmrc`)
- Azure subscription
- Azure Service Principal with appropriate permissions to read resource groups.  
  Make use of Entra ID federation when possible.  

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the project root with your Azure credentials:

```bash
AZURE_CLIENT_ID=<your-service-principal-id>
AZURE_CLIENT_SECRET=<your-service-principal-secret> # if not federated
AZURE_TENANT_ID=<your-azure-tenant-id>```

The service principal only sees subscriptions it has a role on (e.g. Reader).

## Usage

List all subscriptions in the tenant:

```bash
node index.js subscriptions
```

List resource groups in every subscription in the tenant:

```bash
node index.js list
```

List resource groups in a single subscription:

```bash
node index.js list --subscription <subscription-id>
```

## Example Output

```
Authenticating with Azure...
Fetching subscriptions...

Subscription: my-subscription (00000000-0000-0000-0000-000000000000)
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
