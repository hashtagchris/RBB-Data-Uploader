const schema = Object.freeze({
    'ID': 0,
    'Name': '',
    'Email': '',
    'Business Name': '',
    'Category': '',
    'Zip Code': '',
    'Business Description': '',
    'Website': '',
    'In Need': true,
    'CreatedAt': '',
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