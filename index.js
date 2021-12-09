#!/usr/bin/env node
//const inquirer = require('inquirer');
const colors = require('colors');
const program = require('commander');
const fs = require('fs');
const { KeyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");
const credential = new DefaultAzureCredential();
const vaultUrl = 'https://iotest-kv.vault.azure.net/';
const client = new KeyClient(vaultUrl, credential);

const dotenv = require('dotenv');
dotenv.config();

const credentials = {
    clientid: process.env["AZURE_CLIENT_ID"],
    clientsecret: process.env["AZURE_CLIENT_SECRET"],
    tenant: process.env["AZURE_TENANT_ID"],
};


async function list() {
    try {
        if (typeof credentials.clientid === 'undefined' || typeof credentials.clientsecret === 'undefined' || typeof credentials.tenant === 'undefined') {
            // ask for creds
            console.log("### Client Creds were not found in the .env file ###".red);
            console.log("Create .env file in app root with:".yellow);
            console.log("clientid: ".yellow + "<your spn id>\n" + "clientsecret: ".yellow + "<your secret>\n" + "tenant: ".yellow + "<your tenant id>");
        } else {
            console.log('\nCreds Found!')
            //const creds = JSON.stringify(credential);
            //console.log(`\nAzLogin: ${creds}`)
        };
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
}

program
    .command('list')
    .description('List Resources')
    .action(function () {
        list()
    });

program.parseAsync(process.argv);