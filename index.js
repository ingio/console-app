#!/usr/bin/env node
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const program = require('commander');
const Table = require('cli-table3');
const { ClientSecretCredential } = require('@azure/identity');
const { ResourceManagementClient } = require('@azure/arm-resources');

const dotenv = require('dotenv');
dotenv.config();

const credentials = {
  clientid: process.env['AZURE_CLIENT_ID'],
  clientsecret: process.env['AZURE_CLIENT_SECRET'],
  tenant: process.env['AZURE_TENANT_ID'],
  subscriptionid: process.env['AZURE_SUBSCRIPTION_ID'],
};


async function list() {
  try {
    if (typeof credentials.clientid === 'undefined' || typeof credentials.clientsecret === 'undefined' || typeof credentials.tenant === 'undefined' || typeof credentials.subscriptionid === 'undefined') {
      // ask for creds
      console.log('### Client Creds were not found in the .env file ###'.red);
      console.log('Create .env file in app root with:'.yellow);
      console.log('AZURE_CLIENT_ID='.yellow + '<your spn id>');
      console.log('AZURE_CLIENT_SECRET='.yellow + '<your secret>');
      console.log('AZURE_TENANT_ID='.yellow + '<your tenant id>');
      console.log('AZURE_SUBSCRIPTION_ID='.yellow + '<your subscription id>');
      return;
    }

    console.log('\nAuthenticating with Azure...'.cyan);

    // Create credential using client secret
    const credential = new ClientSecretCredential(
      credentials.tenant,
      credentials.clientid,
      credentials.clientsecret
    );

    // Create resource management client
    const client = new ResourceManagementClient(credential, credentials.subscriptionid);

    console.log('Fetching resource groups...'.cyan);

    // Fetch all resource groups
    const resourceGroups = [];
    for await (const rg of client.resourceGroups.list()) {
      resourceGroups.push(rg);
    }

    if (resourceGroups.length === 0) {
      console.log('\nNo resource groups found.'.yellow);
      return;
    }

    // Create table
    const table = new Table({
      head: ['Name'.cyan, 'Location'.cyan, 'Status'.cyan, 'Tags'.cyan],
      colWidths: [30, 20, 15, 40]
    });

    // Add rows
    resourceGroups.forEach(rg => {
      const tags = rg.tags ? Object.keys(rg.tags).map(key => `${key}:${rg.tags[key]}`).join(', ') : 'None';
      table.push([
        rg.name,
        rg.location,
        rg.properties.provisioningState,
        tags
      ]);
    });

    console.log(`\nFound ${resourceGroups.length} resource group(s):\n`.green);
    console.log(table.toString());
  } catch (err) {
    console.log('Error:'.red, err.message);
  }
}

program
  .command('list')
  .description('List Resources')
  .action(function () {
    list();
  });

program.parseAsync(process.argv);
