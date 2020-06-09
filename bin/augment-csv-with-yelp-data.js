#!/usr/bin/env node

// Example usage:
// ./augment-csv-with-yelp-data.js -i rbb.csv -o rbb.augmented.csv -y yelp.json -p phone
const yargs = require("yargs");
const fs = require('fs');
const csv = require('csv-parser');
const {createObjectCsvWriter : createCsvWriter} = require('csv-writer');

const options = yargs
 .usage('Usage: -i path/to/original.csv -p phoneYelp -y path/to/yelp.json -o path/to/augmented.csv')
 .option("i", { alias: "inCsv", describe: "The path to the input csv", type: "string", demandOption: true })
 .option("p", { alias: "phoneColumn", describe: "The name of the phone column for matching", type: "string", demandOption: true })
 .option("y", { alias: "yelpJson", describe: "The path to yelp data", type: "string", demandOption: true})
 .option("o", { alias: "outCsv", describe: "the path to the output csv", type: "string", demandOption: true})
 .argv;

function parseCsv(csvPath) {
    return new Promise((resolve, reject) => {
        const results = [];
 
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', (error) => reject(error));
    })
}

async function writeCsv(csvPath, records) {
    const csvHeader = Object.keys(records[0]).map(key => {
        return {
            id: key,
            title: key,
        };
    });

    const writer = createCsvWriter({
        path: csvPath,
        header: csvHeader
    });

    await writer.writeRecords(records);
}

async function main() {
    const csvData = await parseCsv(options.inCsv);
    const yelpRecords = JSON.parse(fs.readFileSync(options.yelpJson));

    // Build a dictionary by phone number.
    const yelpMap = {};
    for (const yelpRecord of yelpRecords) {
        if (yelpMap[yelpRecord.phone]) {
            console.warn(`Phone number ${yelpRecord.phone} is associated with multiple yelp listings.`);
        }
        yelpMap[yelpRecord.phone] = yelpRecord;
    }

    for (const csvRow of csvData) {
        // console.log(csvRow);

        const phoneNumber = csvRow[options.phoneColumn];
        if (!phoneNumber) {
            console.warn(`Warning: The "${options.phoneColumn}" column is empty for "${csvRow.businessName}"`);
            continue;
        }

        const yelpRecord = yelpMap[phoneNumber];

        if (!yelpRecord) {
            console.warn(`Warning: No yelp listing found for phone number "${phoneNumber}"`);
            continue;
        }

        if (!yelpRecord.location.zip_code) {
            console.warn(`Warning: No zip_code for the yelp listing for "${yelpRecord.name}" (${phoneNumber})`);
            continue;
        }

        // TODO: This column is supposed to be named "Zip Code", per https://github.com/Rebuild-Black-Business/RBB-Data-Uploader/blob/master/src/csv/lib/airtable.js#L7.
        csvRow["zipCode"] = yelpRecord.location.zip_code;
        // console.log(csvRow);
    }

    await writeCsv(options.outCsv, csvData);
}

main();