
const base =  require('./airtable-provider')
const fancyLog = require('../utils').fancyLog
const listRecords = require('./list')
const _ = require('lodash')

const parseData = require('../csv') 
const schema = require('../csv/lib/airtable').schema

const availableFields = [...Object.keys(schema)]
/*
  Add field names here to omit them from the deduplication routine.
  ======================
  For example, the Source field might be overwritten if a business is
  submitted via the webform _after_ it was uploaded by a scraping routine.
  In that case we wouldn't want to add a new row when the only difference
  is the Source field.
*/
const fieldsToIgnore = ['Source', 'Storefront']
const fieldsToDedupe = availableFields.filter(field => !fieldsToIgnore.includes(field))

async function create(tablename, csvFile, csvSource) {
  const csvData = await parseData(csvFile, csvSource)
  listRecords(tablename, tableData => {
    fancyLog(`Deduplicating ${csvData.length} records`)
    const dedupedUploadList = []
    csvData.forEach(csvRow => {
      // Determine if the record already exists in Airtable by checking against a list of safe fields.
      const recordAlreadyExists = tableData.find(tableDataRow => {
        // ensure that every field in the list of fields that qualify for deduplication DO NOT HAVE the same value.  
        return fieldsToDedupe.every(fieldName => {
          // TODO: (bmc) There's got to be a better way to handle this logic, but mah brainz hurt
          if (!csvRow.fields[fieldName] && !tableDataRow[fieldName]) {
            // If neither field has a truthy value, we can bail early and consider them a match.
            return true
          }
          // if both fields have truthy values we need to compare them
          if (csvRow.fields[fieldName] && tableDataRow[fieldName]) {
            return csvRow.fields[fieldName].toString().toUpperCase() === tableDataRow[fieldName].toString().toUpperCase()
          }

          // If you made it here, that means one of your values is falsy and the other is not.
          // Which also means you're not a duplicate
          return false
        })
      })
      if (!recordAlreadyExists) {
        // Pop out any empty values since Airtable may not allow them.
        // example: empty strings don't qualify as numbers
        for (const [key, value] of Object.entries(csvRow.fields)) {
          if (value === '') {
            delete csvRow.fields[key]
          }
        }

        // Handle global defaults, e.g. things that are set regardless of the source data
        csvRow.fields.Approved = false
        csvRow.fields.Storefront = Boolean(csvRow.fields['Zip Code'])

        // Add the record to the deduped list.
        dedupedUploadList.push(csvRow)
      }
    })
    if (dedupedUploadList.length > 0) {
      fancyLog(`Found ${dedupedUploadList.length} unique records`)
      base(tablename).create(dedupedUploadList, function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        fancyLog(`Created ${records.length} new records`)
        records.forEach(function (record) {
          console.log(record.getId());
        });
      });
    } else {
      fancyLog(`No new records created`, 'warning')
    }
  })
}

module.exports = create