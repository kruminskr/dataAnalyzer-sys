require('dotenv').config();

const axios = require('axios');

const { cleanAIResponse } = require('../../../../helpers/utiles');
const { generateAnalysisPrompt } = require('../../../../helpers/dataAnalysisPrompts');

const AI_MODEL = process.env.AI_MODEL;
const AI_API_URL = process.env.AI_API_URL;
const AI_API_KEY = process.env.AI_API_KEY;

const generateResponse = async (data, queryAnalysis) => {
    const content = generateAnalysisPrompt(
        JSON.stringify(data, null, 2),
        queryAnalysis.metadata.intent,
        queryAnalysis.metadata.originalQuery,
        queryAnalysis.countries
    );

    const payload = {
        "model": AI_MODEL,
        stream: false,
        "messages": [{
            "role" : "user",
            content
        }]
    }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AI_API_KEY}`
    };

    const response = await axios.post(`${AI_API_URL}/chat/completions`, payload, {headers});

    return cleanAIResponse(response.data.choices[0].message.content);
}

module.exports = {
    generateResponse    
};
