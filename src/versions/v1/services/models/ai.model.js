require('dotenv').config();

const axios = require('axios');

    const { generateAnalysisPrompt } = require('../../../../helpers/promptGenerator')
const markdownHelper = require('../../../../helpers/markdown')

const AI_MODEL = process.env.AI_MODEL;
const AI_API_URL = process.env.AI_API_URL;
const AI_API_KEY = process.env.AI_API_KEY;

const generateResponse = async (data, queryAnalysis) => {
    const markdownTables = markdownHelper.convertDataToMarkdown(data); 

    const content = generateAnalysisPrompt(
        markdownTables,
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

    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AI_API_KEY}`
    };

    const response = await axios.post(`${AI_API_URL}/chat/completions`, payload, {headers: header});

    return response.data.choices[0].message.content;
}

module.exports = {
    generateResponse    
};
