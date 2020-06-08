#!/usr/bin/env node

const parse = require('../src/csv');

let [,, ...args] = process.argv;
parse(args)