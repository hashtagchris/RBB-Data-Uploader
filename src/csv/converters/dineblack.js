const { schema } = require('../lib/airtable');
// we dont need a mapping here as the dataset matches the schema from Airtable
// still may need some inline parse-processing, hence the file and schema setup. 

/**
 * @param {*} record 
 */
const convertToAirtable = (record) => {
    const result = Object.assign({}, schema);

    for (field in record) {
        if (result[field]) {
            result[field] = record[field]
        }
    }
    return result;
}

module.exports = {
    convertToAirtable
}