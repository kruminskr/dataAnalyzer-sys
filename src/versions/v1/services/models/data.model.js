const axios = require('axios');
const qs = require('qs');

require('dotenv').config();

const sdmxHelper = require('../../../../helpers/sdmx.helper');

// each country gets procesed separately
// for each country a batch of promises is created for all datasets
// and all param combinations in this dataset

const getEurostatData = async (datasetID, neededParams, geo, time) => {
  const params = {
    ...neededParams,
    time,
    geo  
  };

  const queryString = qs.stringify(params, { arrayFormat: 'repeat' });

  const response = await axios.get(`${process.env.EUROSTAT_API_URL}/${datasetID}?${queryString}`);

  const data = response.data;
  const dimensions = response.data.dimension;

  const formattedData = sdmxHelper.sdmxConverter(data, dimensions);

  return formattedData;
}

const generateParamCombos = (params) => {
  const keys = Object.keys(params);

  const values = keys.map(key => Array.isArray(params[key]) ? params[key] : [params[key]]);

  const combos = values.reduce(
    (acc, curr) => acc.flatMap(a => curr.map(b => [...a, b])),
    [[]]
  );

  const result = combos.map(combo =>
    Object.fromEntries(keys.map((key, i) => [key, combo[i]]))
  );

  return result;
};

const getData = async (neededData) => {
  const result = [];

  for (const country of neededData.countries) {
    const countryData = {
      country,
      data: []
    };

    const allPromisesForCountry = neededData.dataType.flatMap(datasetConfig => {
      const { dataType: datasetID, params } = datasetConfig;
      const datasetParamCombos = generateParamCombos(params);

      return datasetParamCombos.map(paramCombo => {
        return getEurostatData(datasetID, paramCombo, country, neededData.years);
      });
    });

    // should add error handling, if one dataset fails, it should not stop the whole process
    const data = await Promise.all(allPromisesForCountry);

    countryData.data.push(...data.flat().filter(Boolean));

    result.push(countryData);
  }

  return result;
};


module.exports = {
    getData
};
