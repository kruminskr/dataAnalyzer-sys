require('dotenv').config();

const axios = require('axios');

const { datasets } = require('../../../../config/dataset.config')

const AI_MODEL = process.env.AI_MODEL;
const AI_API_URL = process.env.AI_API_URL;
const AI_API_KEY = process.env.AI_API_KEY;

// move to helpers
const cleanAIResponse = (response) => {
    const jsonMatch = response.match(/\[.*\]|\{.*\}/s); // Match either array or object

    if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    const normalizeYears = (obj) => {
        if (obj && Array.isArray(obj.years)) {
            obj.years = obj.years.map(y => Number(y));
        }
        return obj;
    };

    if (Array.isArray(parsed)) {
        return parsed.map(normalizeYears);
    }

    return normalizeYears(parsed);
};

const classifyQueryIntent = async (userQuery) => {
    const content = `
    Analyze this user query and classify its intent. Respond ONLY with a valid JSON object:

    {
        "primaryIntent": "one of: comparison, trend_analysis, current_status, correlation, overview",
        "analysisType": "one of: single_country, multi_country, regional, temporal",
        "complexity": "one of: simple, moderate, complex",
        "requiresComparison": true/false,
        "specificActions": ["array of actions like compare_countries, analyze_trends, find_patterns, etc."]
    }

    Query: "${userQuery}"

    Respond ONLY with the JSON object.`;

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

    // models should not contain prompts - vajag parvietot uz /prompts vai arī /helpers/promptGeneraror.js
    const content = `
    Based on this query and its intent, determine what data to retrieve from Eurostat.

    Query: "${userQuery}"
    Intent: ${JSON.stringify(queryIntent)}

    Available datasets:
    ${Object.entries(datasetDescriptions).map(([code, desc]) => `- ${code}: ${desc}`).join('\n')}

    Extract and respond ONLY with a valid JSON object:
    {
        "countries": ["array of 2-letter country codes like LV, EE, LT"],
        "years": ["array of years like 2020, 2021 or ranges"],
        "dataType": ["array of dataset codes needed"],
    }

    Respond ONLY with the JSON object.`;

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

const extractReqParameters = async (datasetIndexes) => {
    const neededDatasets = Object.values(datasets).filter(dataset =>
        datasetIndexes.includes(dataset.id)
    );

    const paramsJson = JSON.stringify(neededDatasets, null, 2)

    // The prompt cant handle a case "men vs women". because it can only choose one value for each parameter.
    // should refine the prompt (the same as all other prompts :D)
    const content = `
    You are given a list of Eurostat datasets and their valid parameters. For each dataset, choose one value for each parameter to best support a general analysis of the dataset.

    You MUST respond ONLY with a valid **JSON ARRAY**. Even if there is only one dataset, it MUST be wrapped in an array.

    Format:
    [
    {
        "dataType": "DATASET_ID",
        "params": {
        "param1": "value1",
        "param2": "value2"
        }
    },
    ...repeat for each dataset
    ]

    Datasets:
    ${paramsJson}
    `;

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
    // const queryIntent = {
    //     primaryIntent: 'trend_analysis',
    //     analysisType: 'single_country',
    //     complexity: 'simple',
    //     requiresComparison: false,
    //     specificActions: [ 'analyze_trends' ]
    // }

    const dataRequirements = await extractDataRequirements(userQuery, queryIntent);
    // const dataRequirements = {
    //     countries: [ 'LV' ],
    //     years: [ 2015, 2016, 2017, 2018 ],
    //     dataType: [ 'LFSA_ERGAN', 'EXT_LT_INTRATRD' ]
    // }

    const requestParameters = await extractReqParameters(dataRequirements.dataType);
    // const requestParameters = [
    //     {
    //         dataType: 'LFSA_ERGAN',
    //         params: { age: 'Y15-74', sex: 'T', citizen: 'TOTAL' }
    //     },
    //     {
    //         dataType: 'EXT_LT_INTRATRD',
    //         params: { indic_et: 'MIO_EXP_VAL', sitc06: 'TOTAL', partner: 'WORLD' }
    //     }
    // ]

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