#!/usr/bin/env node
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const { program } = require('commander');
const Table = require('cli-table3');
const { ClientSecretCredential } = require('@azure/identity');
const { ResourceManagementClient } = require('@azure/arm-resources');
const { SubscriptionClient } = require('@azure/arm-resources-subscriptions');

const dotenv = require('dotenv');
dotenv.config();

const credentials = {
  clientid: process.env['AZURE_CLIENT_ID'],
  clientsecret: process.env['AZURE_CLIENT_SECRET'],
  tenant: process.env['AZURE_TENANT_ID'],
};

// Returns a credential, or undefined (after printing setup help) if required env vars are missing
function getCredential() {
  if (typeof credentials.clientid === 'undefined' || typeof credentials.clientsecret === 'undefined' || typeof credentials.tenant === 'undefined') {
    console.log('### Client Creds were not found in the .env file ###'.red);
    console.log('Create .env file in app root with:'.yellow);
    console.log('AZURE_CLIENT_ID='.yellow + '<your spn id>');
    console.log('AZURE_CLIENT_SECRET='.yellow + '<your secret>');
    console.log('AZURE_TENANT_ID='.yellow + '<your tenant id>');
    return;
  }

  console.log('\nAuthenticating with Azure...'.cyan);
  return new ClientSecretCredential(
    credentials.tenant,
    credentials.clientid,
    credentials.clientsecret
  );
}

// Fetch all subscriptions the service principal can see in the tenant
async function fetchSubscriptions(credential) {
  const client = new SubscriptionClient(credential);
  const subscriptions = [];
  for await (const sub of client.subscriptions.list()) {
    subscriptions.push(sub);
  }
  return subscriptions;
}

async function listSubscriptions() {
  try {
    const credential = getCredential();
    if (!credential) {
      return;
    }

    console.log('Fetching subscriptions...'.cyan);
    const subscriptions = await fetchSubscriptions(credential);

    if (subscriptions.length === 0) {
      console.log('\nNo subscriptions found.'.yellow);
      return;
    }

    const table = new Table({
      head: ['Name'.cyan, 'Subscription ID'.cyan, 'State'.cyan],
      colWidths: [40, 40, 12]
    });

    subscriptions.forEach(sub => {
      table.push([sub.displayName, sub.subscriptionId, sub.state]);
    });

    console.log(`\nFound ${subscriptions.length} subscription(s) in tenant ${credentials.tenant}:\n`.green);
    console.log(table.toString());
  } catch (err) {
    console.log('Error:'.red, err.message);
  }
}

async function list(options) {
  try {
    const credential = getCredential();
    if (!credential) {
      return;
    }

    // Default to every subscription in the tenant; --subscription narrows it to one
    let subscriptions;
    if (options.subscription) {
      const subClient = new SubscriptionClient(credential);
      subscriptions = [await subClient.subscriptions.get(options.subscription)];
    } else {
      console.log('Fetching subscriptions...'.cyan);
      subscriptions = await fetchSubscriptions(credential);
      if (subscriptions.length === 0) {
        console.log('\nNo subscriptions found.'.yellow);
        return;
      }
    }

    for (const sub of subscriptions) {
      console.log(`\nSubscription: ${sub.displayName} (${sub.subscriptionId})`.magenta);
      console.log('Fetching resource groups...'.cyan);

      const client = new ResourceManagementClient(credential, sub.subscriptionId);
      const resourceGroups = [];
      for await (const rg of client.resourceGroups.list()) {
        resourceGroups.push(rg);
      }

      if (resourceGroups.length === 0) {
        console.log('No resource groups found.'.yellow);
        continue;
      }

      const table = new Table({
        head: ['Name'.cyan, 'Location'.cyan, 'Status'.cyan, 'Tags'.cyan],
        colWidths: [30, 20, 15, 40]
      });

      resourceGroups.forEach(rg => {
        const tags = rg.tags ? Object.keys(rg.tags).map(key => `${key}:${rg.tags[key]}`).join(', ') : 'None';
        table.push([
          rg.name,
          rg.location,
          rg.properties.provisioningState,
          tags
        ]);
      });

      console.log(`Found ${resourceGroups.length} resource group(s):\n`.green);
      console.log(table.toString());
    }
  } catch (err) {
    console.log('Error:'.red, err.message);
  }
}

program
  .command('list')
  .description('List resource groups in all subscriptions in the tenant')
  .option('-s, --subscription <id>', 'only list resource groups in this subscription')
  .action(function (options) {
    return list(options);
  });

program
  .command('subscriptions')
  .description('List all subscriptions in the tenant')
  .action(function () {
    return listSubscriptions();
  });

program.parseAsync(process.argv);
