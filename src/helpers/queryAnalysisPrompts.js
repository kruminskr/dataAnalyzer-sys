const classifyQueryIntentPrompt = (userQuery) => `
Analyze this user query and classify its intent. Respond ONLY with a valid JSON object:

{
    "primaryIntent": "one of: comparison, trend_analysis, current_status, correlation, overview",
    "analysisType": "one of: single_country, multi_country, regional, temporal",
    "complexity": "one of: simple, moderate, complex",
    "requiresComparison": true/false,
    "specificActions": ["array of actions like compare_countries, analyze_trends, find_patterns, etc."]
}

Query: "${userQuery}"

Respond ONLY with the JSON object.
`;

const extractDataRequirementsPrompt = (userQuery, queryIntent, datasetDescriptions) => `
Based on this query and its intent, determine what data to retrieve from Eurostat.

Query: "${userQuery}"
Intent: ${JSON.stringify(queryIntent)}

Available datasets:
${Object.entries(datasetDescriptions).map(([code, desc]) => `- ${code}: ${desc}`).join('\n')}

Extract and respond ONLY with a valid JSON object:
{
    "countries": ["array of 2-letter country codes like LV, EE, LT"],
    "years": ["array of years like 2020, 2021 or ranges"],
    "dataType": ["array of dataset codes needed"]
}

Respond ONLY with the JSON object.
`;

const extractReqParametersPrompt = (datasetParams, userQuery) => `
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

module.exports = {
  classifyQueryIntentPrompt,
  extractDataRequirementsPrompt,
  extractReqParametersPrompt
};