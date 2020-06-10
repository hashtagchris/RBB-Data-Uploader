const {schema} = require('../lib/airtable');

const AirtableMapping = {
    email: 'Email', 
    name: 'Name',
    businessName: 'Business Name',
    category: 'Original Category',
    zipCode: 'Zip Code',
    businessDescription: 'Business Description',
    website: 'Website',
    image: 'Image',
    physicalLocation: 'Physical Location',
    latitude: 'Latitude',
    longitude: 'Longitude',
}

const convertToAirtable = (record) => {
    const result = Object.assign({}, schema);

    for(field in record) {
        if(AirtableMapping[field]) {
            let mappedField = AirtableMapping[field];    
                result[mappedField] = record[field]
        }
    }
    return result;
}

module.exports = {
    convertToAirtable
}