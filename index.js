#!/usr/bin/env node
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const program = require('commander');

const dotenv = require('dotenv');
dotenv.config();

const credentials = {
  clientid: process.env['AZURE_CLIENT_ID'],
  clientsecret: process.env['AZURE_CLIENT_SECRET'],
  tenant: process.env['AZURE_TENANT_ID'],
};


async function list() {
  try {
    if (typeof credentials.clientid === 'undefined' || typeof credentials.clientsecret === 'undefined' || typeof credentials.tenant === 'undefined') {
      // ask for creds
      console.log('### Client Creds were not found in the .env file ###'.red);
      console.log('Create .env file in app root with:'.yellow);
      console.log('clientid: '.yellow + '<your spn id>\n' + 'clientsecret: '.yellow + '<your secret>\n' + 'tenant: '.yellow + '<your tenant id>');
      console.log('you entered: ' + credentials);
    } else {
      console.log('\nCreds Found!');
    };
  } catch (err) {
    console.log(err);
  }
}

program
  .command('list')
  .description('List Resources')
  .action(function () {
    list();
  });

program.parseAsync(process.argv);
