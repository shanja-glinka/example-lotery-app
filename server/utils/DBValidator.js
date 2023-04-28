
const toValueString = (val, quote = '\'') => {
    if (typeof val === 'string')
        return quote + val + quote;
    else
        return val;
}

const arrayToValideString = (val, quote = '\'') => {
    if (typeof val === 'string')
        return quote + val[i] + quote;

    let tempArr = [];

    for (let i = 0; i < val.length; i++) {
        tempArr.push(toValueString(val[i], quote));
    }

    return tempArr.join(',');
}




exports.validateFields = (fieldsArray) => {
    return arrayToValideString(fieldsArray, '`');
}

exports.validateField = (field) => {
    return toValueString(field, '`');
}


exports.validateValue = (valuesArray) => {
    return toValueString(valuesArray, '"');
}

exports.validateValues = (value) => {
    return arrayToValideString(value, '"');
}