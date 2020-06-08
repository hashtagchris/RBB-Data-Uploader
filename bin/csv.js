#!/usr/bin/env node

const {main} = require('../src/csv');

let [,, ...args] = process.argv;
parse(args)