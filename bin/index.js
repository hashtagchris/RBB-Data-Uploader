#!/usr/bin/env node

require('dotenv').config();

const yargs = require("yargs");
const createRecords = require('../src/airtable-functions/create')

const options = yargs
 .usage('Usage: -t <tablename -c path/to/file.csv -s data-source [gofundme, obws, ranktribe]')
 .option("t", { alias: "tablename", describe: "The name of the table you wish to update", type: "string", demandOption: true })
 .option("c", {alias: "csv", describe: "The path to the csv file to parse", type: "string", demandOption: true})
 .option("s", {alias: "source", describe: "the name or abbreviation for the csv source. ", type: "string", demandOption: true})
 .argv;

createRecords(options.tablename, options.csv, options.source)