require('dotenv').config();

const axios = require('axios');

const prompts = require('../../../../helpers/queryAnalysisPrompts');
const { cleanAIResponse } = require('../../../../helpers/utiles');
const { datasets } = require('../../../../config/dataset.config')

const AI_MODEL = process.env.AI_MODEL;
const AI_API_URL = process.env.AI_API_URL;
const AI_API_KEY = process.env.AI_API_KEY;
const EUROSTAT_API_URL = process.env.EUROSTAT_API_URL;

const classifyQueryIntent = async (userQuery) => {
    const content = prompts.classifyQueryIntentPrompt(userQuery);

    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AI_API_KEY}`
    };

    const payload = {
        "model": AI_MODEL,
        stream: false,
        "messages": [{
            "role": "user",
            content
        }]
    };

    const response = await axios.post(`${AI_API_URL}/chat/completions`, payload, {headers: header});

    return cleanAIResponse(response.data.choices[0].message.content);
    };

const extractDataRequirements = async (userQuery, queryIntent) => {
    const datasetDescriptions = Object.fromEntries(
        Object.entries(datasets).map(([code, dataset]) => [code, dataset.description])
    );

    const content = prompts.extractDataRequirementsPrompt(userQuery, queryIntent, datasetDescriptions);

    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AI_API_KEY}`
    };

    const payload = {
        "model": AI_MODEL,
        stream: false,
        "messages": [{
            "role": "user",
            content
        }]
    };

    const response = await axios.post(`${AI_API_URL}/chat/completions`, payload, {headers: header});

    return cleanAIResponse(response.data.choices[0].message.content);
};

const getDatasetParameters = async (datasetIndexes) => {
    const paramOptions = [];

    for (const datasetID of datasetIndexes) {
        const params = {
            time: '2099' // Use future year so there are no values, only dimensions
        }

        const { data } = await axios.get(`${EUROSTAT_API_URL}/${datasetID}`, { params });

        const dimensions = {
            id: datasetID,
            description: data.label,
            params: {}
        };

        for (const dimKey in data.dimension) {
            if (dimKey === 'time' || dimKey === 'geo') {
                continue; 
            }

            const dimension = data.dimension[dimKey];

            const label = dimension.label;
            const possibleValues = dimension.category.label

            dimensions.params[dimKey] = {
                label,
                options: possibleValues
            };
        }
        paramOptions.push(dimensions);
    }
    return paramOptions;
}

const extractReqParameters = async (datasetParams, userQuery) => {
    const content = prompts.extractReqParametersPrompt(datasetParams, userQuery);

    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AI_API_KEY}`
    };

    const payload = {
        "model": AI_MODEL,
        stream: false,
        "messages": [{
            "role": "user",
            content
        }]
    };

    const response = await axios.post(`${AI_API_URL}/chat/completions`, payload, {headers: header});

    return cleanAIResponse(response.data.choices[0].message.content);
}

const processQuery = async (userQuery) => {
    const queryIntent = await classifyQueryIntent(userQuery);

    const dataRequirements = await extractDataRequirements(userQuery, queryIntent);

    const datasetParams = await getDatasetParameters(dataRequirements.dataType);

    const requestParameters = await extractReqParameters(datasetParams, userQuery);

    const queryAnalysis  = {
        countries: dataRequirements.countries,
        years: dataRequirements.years,
        dataType: requestParameters,
        metadata: {
            originalQuery: userQuery,
            intent: queryIntent,        
        }
    }

    return queryAnalysis;
};

module.exports = {
     processQuery
};