const {schema} = require('../lib/airtable');

const AirtableMapping = {
    name: 'Name',
    link: 'Donation Link',
    categories: 'Original Category',
    zipCode: 'Zip Code',
    description: 'Business Description',
    imageUrl: 'Image'
}

const convertToAirtable = (record) => {
    const result = Object.assign({}, schema);

    for(field in record) {
        const mappedField = AirtableMapping[field];
        if(mappedField) {
            result[mappedField] = record[field]
        }
    }
    return result;
}

module.exports = {
    convertToAirtable
}