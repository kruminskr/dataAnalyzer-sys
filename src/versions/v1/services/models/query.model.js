require('dotenv').config();

const axios = require('axios');

const { datasets } = require('../../../../config/dataset.config')

const AI_MODEL = process.env.AI_MODEL;
const AI_API_URL = process.env.AI_API_URL;
const AI_API_KEY = process.env.AI_API_KEY;
const EUROSTAT_API_URL = process.env.EUROSTAT_API_URL;

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

    //    Available datasets:
    // ${Object.entries(datasetDescriptions).map(([code, desc]) => `- ${code}: ${desc}`).join('\n')}

    const content = `
    Based on this query and its intent, determine what data to retrieve from Eurostat.

    Query: "${userQuery}"
    Intent: ${JSON.stringify(queryIntent)}
    

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
    // should refine the prompt (the same as all other prompts :D)
    const content = `
    You are given a list of Eurostat datasets and their valid parameters. Based on the user's query, choose the most relevant value(s) for each parameter to support meaningful analysis.

    Query:
    "${userQuery}"

    If a comparison is meaningful (e.g., men vs women, different age groups), return an **array of values** for that parameter.

    If no comparison is needed, return a single string value.

    Respond ONLY with a valid **JSON ARRAY**, even if only one dataset is needed.

    Format:
    [
    {
        "dataType": "DATASET_ID",
        "params": {
        "param1": "value1",
        "param2": ["value1", "value2"]
        }
    },
    ...repeat for each dataset
    ]

    Datasets:
    ${JSON.stringify(datasetParams, null, 2)}
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

    const datasetParams = await getDatasetParameters(dataRequirements.dataType);

    const requestParameters = await extractReqParameters(datasetParams, userQuery);
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