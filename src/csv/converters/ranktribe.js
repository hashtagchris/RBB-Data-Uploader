const {schema} = require('../lib/airtable');

const AirtableMapping = {
    name: 'Name',
    link: 'Donation Link',
    categories: 'Category',
    address:   'Zip Code',
    description: 'Business Description',
    imageUrl: 'Image'
}

const convertToAirtable = (record) => {
    const result = Object.assign({}, schema);

    for(field in record) {
        if(AirtableMapping[field]) {
            result[mappedField] = record[field]
        }
    }
    return result;
}

module.exports = {
    convertToAirtable
}