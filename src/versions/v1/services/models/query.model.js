require('dotenv').config();

const axios = require('axios');

const ApiError = require('../../../../utiles/AppError'); 

const AI_MODEL = process.env.AI_MODEL;
const AI_API_URL = process.env.AI_API_URL;

const cleanAIResponse = (response) => {
    const jsonMatch = response.match(/\{[\s\S]*\}/);

    let parsed = JSON.parse(jsonMatch[0]);

    if (Array.isArray(parsed.years)) {
        parsed.years = parsed.years.map(y => Number(y));
    }

    return parsed;
}

const processQuery = async (userQuery) => {
    const content = `
    You will receive a user query about housing or related data.

    Extract the following information and respond ONLY with a valid JSON object, nothing else — no extra text, no explanations, no new lines except those needed for JSON format:

    1. countries: array of 2-letter country codes (e.g. "LV").
    2. years: array of years mentioned or ranges of years if implied.
    3. dataType: array of dataset codes best matching the query from this list:
    - PRC_HPI_A
    - PRC_HICP_AIND
    - STS_COBP_A
    - ILC_LVHO07A
    - DEMO_PJAN

    User query: "${userQuery}"

    **Respond ONLY with the JSON object, and provide no other text/charecters. The object will be used later in the system**
    `;

    const payload = {
        "model": AI_MODEL,
        stream: false,
        "messages": [{
            "role" : "user",
            content
        }]
    }

    const response = await axios.post(`${AI_API_URL}/api/chat`, payload)

    const neededData = cleanAIResponse(response.data.message.content)

    return neededData;
};

module.exports = {
     processQuery
     };