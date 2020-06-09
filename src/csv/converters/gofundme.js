const {schema} = require('../lib/airtable');

const AirtableMapping = {
    includeOnWebsite: 'Approved',
    pageUrl: 'Donation Link',
    organizerName: 'Name',
    category: 'Original Category',
    progress:   'In Need'
}

const convertToAirtable = (record) => {
    const result = Object.assign({}, schema);

    for(field in record) {
        if(AirtableMapping[field]) {
            let mappedField = AirtableMapping[field];
            switch (mappedField) {
                case 'In Need': {
                    result[mappedField] = record[field] < 1 ? true : false
                    break;
                }
                case 'Approved': {
                    result[mappedField] = record[field] === 'Yes' ? true : false
                    break;
                }
                default:
                    result[mappedField] = record[field]
            }
        }
    }
    return result;
}

module.exports = {
    convertToAirtable
}