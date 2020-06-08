const fs = require('fs');
const csv = require('csv-parser');
const getStream = require('get-stream');
const {normalizeRecord} = require('./lib/airtable');
const converters = require('./converters');

module.exports = async (csvFile, source) => {
    const {convertToAirtable} = converters[source] || null;
    const uploadArray = [];
    
    const streamData = await getStream.array(fs.createReadStream(csvFile)
      .pipe(csv()))
      return streamData.map(row => {
          return normalizeRecord(row, convertToAirtable)})
}