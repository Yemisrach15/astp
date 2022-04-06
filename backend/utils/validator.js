const validator = require('validator');

/**
 * Validator function for incoming data
 * @param {string} data - data to be validated
 * @param {string} type - expected type of data. 'string' || 'number' || 'date'
 * @param {string} fieldname
 * @param {Number} min 
 * @param {Number} max 
 * @param {string} ignore 
 * @param {Array} allowedValues 
 * @returns {Array} array of errors
 */

const checkError = (data, type = 'string', fieldname, min, max, ignore, allowedValues) => {
	let errors = [];

	switch (type) {
		case 'string':
			errors = checkString(data, fieldname, min, max, ignore, allowedValues);
			break;
		case 'number':
			errors = checkNumber(data, fieldname, min, max);
			break;
		case 'date':
			errors = checkDate(data, fieldname, min, max);
			break;
	}

	return errors.length? errors: null;
}

const checkString = (data, fieldname, min, max, ignore, allowedValues) => {
	let errors = [];

	if (!validator.isAlpha(data, 'en-US', {ignore}))
		errors.push(`${fieldname} can only contain alphabetical letters.`);
	if (min && max && !validator.isLength(data, {min, max}))
		errors.push(`${fieldname} must be ${min} to ${max} characters.`);
	if (allowedValues && !validator.isIn(data, allowedValues))
		errors.push(`${fieldname} can only be [${allowedValues}].`);

	return errors;
}

const checkNumber = (data, fieldname, min, max) => {
	let errors = [];

	if (!validator.isNumeric(data.toString()))
		errors.push(`${fieldname} must be numeric.`);
	if (min && !validator.isNumeric(data.toString(), {min}))
		errors.push(`${fieldname} must be greater than ${min}`);
	if (min && max &&!validator.isNumeric(data.toString(), {min, max}))
		errors.push(`${fieldname} must be ${min} to ${max}.`);
	
	return errors;
}

const checkDate = (data, fieldname, min, max) => {
	let errors = [];

	if (!validator.isDate(data, {format: 'YYYY-MM-DD'}))
		errors.push(`${fieldname} is not a valid date. Use format YYYY-MM-DD.`);
	if (!validator.isAfter(data, min))
		errors.push(`${fieldname} must be after ${min}`);
	if (!validator.isBefore(data, max))
		errors.push(`${fieldname} must be before ${max}`);
	
	return errors;
}

module.exports = checkError;