# Docs > CSV Module

## Summary
The csv module is responsible for the parsing of csv files for intake that we want to upload to our Airtable record store. 

Each new csv source is a simple mapper object and a conversion function, setup as a lightweight commonjs module. 

### Creating a New Converter

New converters can be added simply by adding a couple of exported methods to a file in the modules/csv/converters module path. 

#### [module].js

A new module just needs to follow these conventions:

* The filename should match the name of the source and will be the same name someone enters on the command line. 
* The file needs to have a defined AirtableMapping object, which defines which keys on the csv are mapped to which columns on the Airtable schema. 
* `convertToAirtable` method - the main script expects that an exported module has an exported  `convertToAirtable` method. This method will be responsible for converting an individual record to matching the Airtable schema as defined in `csv/lib/airtable.js`. This method gets passed into our csv parser routine. 

As long as you ensure those three things, any new csv row converter should just plug right into the main function call. 

### How It Works

The app uses the following command to run a csv parsing job:

`./bin/csv.js ./path/to/file [source] (--dry-run)`

The main parse routine uses the name of the source to grab the correct exported `convertToAirtable` method for a given source. 

We then use a Node stream in order to pass in the csv file via path that we want to process. As we prep a normalized object for the Airtable request, we convert each row on the csv to match a row as an Airtable record. We then take an array of those and upload to our table. 