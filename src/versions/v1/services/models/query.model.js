require('dotenv').config();

const ApiError = require('../../../../utiles/AppError');

const countriesString = process.env.COUNTRIES;
const dataTypesString = process.env.DATA_TYPES;

const COUNTRIES = countriesString ? countriesString.split(',') : [];
const DATA_TYPES = dataTypesString ? dataTypesString.split(',') : [];

const extractYears = (text) => {
  const currentYear = new Date().getFullYear();
  const yearsSet = new Set();

const yearRegex = /\b(20\d{2})\b/g;
    let match;
    while ((match = yearRegex.exec(text)) !== null) {
        const year = parseInt(match[1], 10);
        if (year >= 2000 && year <= currentYear + 1) {
        yearsSet.add(year);
        }
    }

    const rangeRegex = /\b(?:from|between)\s+(20\d{2})\s+(?:to|and)\s+(20\d{2})\b/g;
    while ((match = rangeRegex.exec(text)) !== null) {
        let startYear = parseInt(match[1], 10);
        let endYear = parseInt(match[2], 10);

        if (startYear > endYear) {
        [startYear, endYear] = [endYear, startYear];
        }

        for (let y = startYear; y <= endYear; y++) {
        if (y >= 2000 && y <= currentYear + 1) {
            yearsSet.add(y);
        }
        }
    }

    return Array.from(yearsSet).sort();
}

const extractCountries = (text) => {
    const found = new Set();
    const lowerText = text.toLowerCase();

    for (const country of COUNTRIES) {
        if (lowerText.includes(country.toLowerCase())) {
        found.add(country);
        }
    }

    return Array.from(found);
}

const extractDataTypes = (text) => {
  const found = new Set();
  const lowerText = text.toLowerCase();

  for (const type of DATA_TYPES) {
    if (lowerText.includes(type)) {
      found.add(type);
    }
  }

  return Array.from(found);
}

const processQuery = (userQuery) => {
    const countries = extractCountries(userQuery);
    if (countries.length === 0) {
        throw new ApiError('No valid countries found in the query.', 400);
    }

    const years = extractYears(userQuery);
    if (years.length === 0) {
        throw new ApiError('No valid years found in the query.', 400);  
    }

    const  dataType = extractDataTypes(userQuery);
    if (dataType.length === 0) {   
        throw new ApiError('No valid data types found in the query.', 400);
    }   

    const neededData =  {
        countries,
        years,
        dataType
    };

    return neededData;
}

module.exports = {
    processQuery
}

// TO-DO
// 1. statis function to extract keywords from a user query

// 2. Later on the user query gets anylized by AI

// 3. user query gets anylized by AI and returns year range, needed data sets and countries
