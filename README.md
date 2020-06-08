# RBB-data-uploader

The RBB Data Uploader is responsible for uploading data from a CSV file into Airtable.  There are multiple CSV file sources with their own schemas; each of them needs to be converted into a common schema for Airtable.

Additionally, this project is responsible for preventing duplicate information from being added to Airtable.

### Getting started
1. Make a copy of the `.env.example` file.  Rename the copy to `.env`
1. Make a clone of the existing airtable base from production
1. Fill in the two missing pieces of information in the `.env` file.  They should be the intended Airtable base (the one you just created) and your personal API Key.

1. From the root of the directory run each of the commands below

```
npm i
npm install -g .
```

This will allow you to use the `upload-data` command from your terminal.  Here's an example:

```bash
upload-data -t Businesses -c ./test/data/gofundme-data-1-row-test.csv -s gofundme
```

### Command args

_taken from `upload-data --help`_

```bash
Usage: -t <tablename -c path/to/file.csv -s data-source [gofundme, obws]

Options:
  --help           Show help                                              [boolean]
  --version        Show version number                                    [boolean]
  -t, --tablename  The name of the table you wish to update     [string] [required]
  -c, --csv        The path to the csv file to parse            [string] [required]
  -s, --source     the name or abbreviation for the csv source. [string] [required]
```

### CSV Parser

[See here](./Docs/csv-module.md) for the CSV parser documentation.
