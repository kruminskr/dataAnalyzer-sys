require('dotenv').config();

const axios = require('axios');

const AI_MODEL = process.env.AI_MODEL;
const AI_API_URL = process.env.AI_API_URL;
const AI_API_KEY = process.env.AI_API_KEY;

const cleanAIResponse = (response) => {
    const jsonMatch = response.match(/\{[\s\S]*\}/);

    let parsed = JSON.parse(jsonMatch[0]);

    if (Array.isArray(parsed.years)) {
        parsed.years = parsed.years.map(y => Number(y));
    }

    return parsed;
}

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
    const datasetDescriptions = {
        "PRC_HPI_A": "House Price Index - tracks housing price changes over time",
        "PRC_HICP_AIND": "Harmonized Index Consumer Prices - inflation data", 
        "STS_COBP_A": "Construction permits and building activity",
        "ILC_LVHO07A": "Housing cost burden statistics",
        "DEMO_PJAN": "Population demographics and changes"
    };

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

    const payload = {
        "model": AI_MODEL,
        stream: false,
        "messages": [{
            "role": "user",
            content
        }]
    };

    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AI_API_KEY}`
    };

    const response = await axios.post(`${AI_API_URL}/chat/completions`, payload, {headers: header});

    return cleanAIResponse(response.data.choices[0].message.content);
};

const processQuery = async (userQuery) => {
    const queryIntent = await classifyQueryIntent(userQuery);

    const dataRequirements = await extractDataRequirements(userQuery, queryIntent);

    const queryAnalysis  = {
        countries: dataRequirements.countries,
        years: dataRequirements.years,
        dataType: dataRequirements.dataType,
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