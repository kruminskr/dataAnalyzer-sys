const axios = require('axios');
const qs = require('qs');

require('dotenv').config();

const sdmxHelper = require('../../../../helpers/sdmx.helper');

const getEurostatData = async (datasetID, neededParams, geo, time) => {
  const params = {
    ...neededParams,
    time,
    geo  
  };

  console.log('Request Parameters:', params);

  const queryString = qs.stringify(params, { arrayFormat: 'repeat' });

  const response = await axios.get(`${process.env.EUROSTAT_API_URL}/${datasetID}?${queryString}`);

  const data = response.data;
  const dimensions = response.data.dimension;

  const formattedData = sdmxHelper.sdmxConverter(data, dimensions);

  return formattedData;
}

const getData = async (neededData) => {
  const result = [];

  for (const country of neededData.countries) {
    const countryData = {
      country,
      data: []
    };

    const datasetPromises = neededData.dataType.map(datasetConfig => {
      const { dataType: datasetID, params } = datasetConfig; 

      return getEurostatData(datasetID, params, country, neededData.years);
    });

    const datasets = await Promise.all(datasetPromises);

    for (const data of datasets) {
      countryData.data.push(...data);
    }

    result.push(countryData);
  }

  return result;
};


module.exports = {
    getData
};
