const schema = Object.freeze({
    'Name': '',
    'Email': '',
    'Business Name': '',
    'Category': '',
    'Original Category': '',
    'Zip Code': '',
    'Business Description': '',
    'Website': '',
    'Image': '',
    'In Need': true,
    'Source': 'Uploaded',
    'Latitude': '',
    'Longitude': '',
});

const normalizeRecord = (data, converter) => {
    return {
        fields: converter(data)
    }
}

module.exports = {
    schema,
    normalizeRecord
}