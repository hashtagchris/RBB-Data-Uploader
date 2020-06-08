#!/usr/bin/env node

const yargs = require("yargs");

const {cli_handler} = require('../src/geocode/index');

const options = yargs
 .usage('Usage: -c path/to/input.csv -o path/to/output.csv')
 .option("c", {alias: "csvin", describe: "the path to the csv file to parse", type: "string", demandOption: true})
 .option("o", {alias: "csvout", describe: "the path to the csv file to write", type: "string", demandOption: false})
 .argv;

cli_handler(options.csvin, options.csvout);