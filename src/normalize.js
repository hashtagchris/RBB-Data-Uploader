// Note: We could use the 'url-exists' package, but it doesn't seem to work reliably.
// For example, it returns false for http://anthonyscookies.com.

// attempts to normalize and validate a url, adding a scheme if necessary.
// returns an empty string if the url is not valid.
module.exports.normalizeUrl = function (url) {
    // ignoring intranet sites and localhost, there needs to be a period in the domain name.
    if (!url.includes(".")) {
        return ""
    }

    // If there isn't a scheme, add one.
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "http://" + url
    }

    try {
        return new URL(url).toString()
    }
    catch (err) {
        // console.error(err)
    }

    return ""
}

module.exports.normalizeZipCode = function (zipCode) {
    // If the zip code is all zeroes and whitespace, set it to a falsey value.
    if (zipCode.trim().replace(/0/g, "")) {
        return ""
    }

    // Add back leading zeroes that may have been removed by treating the zip as a numeric value.
    return zipCode.toString(10).padStart(5, '0')
}