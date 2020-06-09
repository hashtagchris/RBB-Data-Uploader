const schema = Object.freeze({
    'Name': '',
    'Email': '',
    'Business Name': '',
    'Category': '',
    'Original Category': '',
    'Zip Code': '',
    'Business Description': '',
    'Website': '',
    'In Need': true,
    'Source': 'Uploaded',
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