
const base =  require('./airtable-provider')
const fancyLog = require('../utils').fancyLog
const listRecords = require('./list')
const _ = require('lodash')

const parseData = require('../csv') 


async function create(tablename, csvFile, csvSource) {
  // TODO: (bmc) Need to get this list from a CSV file referenced as an arg to the command
  const listToUpload = await parseData(csvFile, csvSource)
  listRecords(tablename, function createRecords(tableData) {
    const dedupedUploadList = []
    listToUpload.forEach(function(row) {
      const recordAlreadyExists = tableData.find(function(datum) {
        // TODO: (bmc) Need to dedupe against additional fields.
        return row.fields.Name === datum.Name || row.fields.Email === datum.Email
      })
      if (!recordAlreadyExists) {
        dedupedUploadList.push(row)
      }
    })
    if (dedupedUploadList.length > 0) {
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