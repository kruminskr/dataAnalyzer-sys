const housingRawData = require('../../../../../data/housing.json');
const gdpRawData = require('../../../../../data/gdp.json');
const populationRawData = require('../../../../../data/population.json');

const getHousingData = (country, years) => {
    const match = housingRawData.find(entry => entry.country.toLowerCase() === country.toLowerCase());

    if (!match) return { dataType: 'housing', years: [] };

    const expandedYears = years.flatMap(year => [
        `${year}-Q1`,
        `${year}-Q2`,
        `${year}-Q3`,
        `${year}-Q4`,
    ]);

    const filteredData = match.years.filter(entry => expandedYears.includes(entry.year));

    return {
        dataType: 'housing',
        years: filteredData
    };
};

const getGDPData = (country, years) => {
    const match = gdpRawData.find(entry => entry.country.toLowerCase() === country.toLowerCase());

    if (!match) return { dataType: 'gdp', years: [] };

    const sanitizedYears = years.map(String);

    const filteredData = match.years.filter(entry => sanitizedYears.includes(entry.year));

    return {
        dataType: 'gdp',
        years: filteredData
    };
}

const getPopulationData = (country, years) => {
    const match = populationRawData.find(entry => entry.country.toLowerCase() === country.toLowerCase());
    if (!match) return { dataType: 'population', years: [] };


    const sanitizedYears = years.map(String);

    const filteredData = match.years.filter(entry => sanitizedYears.includes(entry.year));

    return {
        dataType: 'population',
        years: filteredData
    };
}

// Function that takes {countries: ['Germany'], years: [2020,2021,2022], dataType: 'housing'} 
// and calls all the function to gather data for each data type
const getData = (neededData) => {
  const result = [];

  for (const country of neededData.countries) {
    const countryData = {
      country,
      data: []
    };

    if (neededData.dataType.includes('housing')) {
      const housing = getHousingData(country, neededData.years); 
      countryData.data.push(housing);
    }

    if (neededData.dataType.includes('gdp')) {
      const gdp = getGDPData(country, neededData.years);
      countryData.data.push(gdp);
    }

    if (neededData.dataType.includes('population')) {
      const population = getPopulationData(country, neededData.years);
      countryData.data.push(population);
    }

    result.push(countryData);
  }

  return result;
};


module.exports = {
    getData
};

// TO-DO
// 1. Static JSON files stored locally

// 2. Data gets called from eurostat API (Need to convert from SDMX to a format which AI can read)

// 3. Moodel recives what data sets needs to be called and calls these data sets, works with any data set (previosly only 3 data sets)