const axios = require('axios');
const qs = require('qs');

require('dotenv').config();

const sdmxHelper = require('../../../../helpers/sdmx.helper');

// House Price Index (HPI)
const getHousePriceIndexData = async (geo, time) => {
  const params = {
    format: 'json',
    purchase: 'TOTAL',
    unit: 'I15_A_AVG',
    time,
    geo  
  };

  // vai šis tiešām labākais solution?
  // nepieciešams, lai pareizi izskatītis geo param
  const queryString = qs.stringify(params, { arrayFormat: 'repeat' });

  // data set indicator vajadzētu izņemt ārpus?
  const response = await axios.get(`${process.env.EUROSTAT_API_URL}/prc_hpi_a?${queryString}`);

  const data = response.data;
  const dimensions = response.data.dimension;

  const formattedData = sdmxHelper.sdmxConverter(data, dimensions);

  return formattedData;
}

// Actual Rent Prices 
const getRentPriceData = async (geo, time) => {
  const params = {
    format: 'json',
    coicop: 'CP041',
    unit: 'INX_A_AVG',
    time,
    geo  
  };

  const queryString = qs.stringify(params, { arrayFormat: 'repeat' });

  const response = await axios.get(`${process.env.EUROSTAT_API_URL}/PRC_HICP_AIND?${queryString}`);

  const data = response.data;
  const dimensions = response.data.dimension;

  const formattedData = sdmxHelper.sdmxConverter(data, dimensions);

  return formattedData;
}

// Building Permits (new housing supply)
const getBuildingPermitsData = async (geo, time) => {
  const params = {
    format: 'json',
    indic_bt: 'BPRM_SQM',
    cpa2_1: 'CPA_F41001_41002',
    s_adj: 'NSA',
    unit: 'MIO_M2',
    time,
    geo  
  };

  const queryString = qs.stringify(params, { arrayFormat: 'repeat' });

  const response = await axios.get(`${process.env.EUROSTAT_API_URL}/sts_cobp_a?${queryString}`);

  const data = response.data;
  const dimensions = response.data.dimension;

  const formattedData = sdmxHelper.sdmxConverter(data, dimensions);

  return formattedData;
}

// Housing Cost Overburden Rate
const getHousingCostOverburdenRateData = async (geo, time) => {
  const params = {
    format: 'json',
    unit: 'PC',
    incgrp: 'TOTAL',
    age: 'TOTAL',
    sex: 'T',
    time,
    geo  
  };

  const queryString = qs.stringify(params, { arrayFormat: 'repeat' });

  const response = await axios.get(`${process.env.EUROSTAT_API_URL}/ILC_LVHO07A?${queryString}`);

  const data = response.data;
  const dimensions = response.data.dimension;

  const formattedData = sdmxHelper.sdmxConverter(data, dimensions);

  return formattedData;
}


// Population by Region
const getPopulationByRegionData = async (geo, time) => {
  const params = {
    format: 'json',
    unit: 'NR',
    age: 'TOTAL',
    sex: 'T',
    time,
    geo  
  };

  const queryString = qs.stringify(params, { arrayFormat: 'repeat' });

  const response = await axios.get(`${process.env.EUROSTAT_API_URL}/DEMO_PJAN?${queryString}`);

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

    if (neededData.dataType.includes('housing')) {
      const housing = await getHousePriceIndexData(country, neededData.years); 

      countryData.data.push(...housing);
    }

    if (neededData.dataType.includes('rent')) {
      const rent = await getRentPriceData(country, neededData.years);
      countryData.data.push(...rent);
    }

    if (neededData.dataType.includes('building')) {
      const building = await getBuildingPermitsData(country, neededData.years);
      countryData.data.push(...building);
    }

    if (neededData.dataType.includes('overburden')) {
      const overburden = await getHousingCostOverburdenRateData(country, neededData.years);
      countryData.data.push(...overburden);
    }

    if (neededData.dataType.includes('population')) {
      const population = await getPopulationByRegionData(country, neededData.years);
      countryData.data.push(...population);
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
// The data gets converted from sdmx to a format that the AI can read using a npm package:
// jsonstat-suite??