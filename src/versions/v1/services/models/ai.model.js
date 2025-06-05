const markdownHelper = require('../../../../helpers/markdown')

require('dotenv').config();
const axios = require('axios');

const AI_MODEL = process.env.AI_MODEL;
const AI_API_URL = process.env.AI_API_URL;

const generateResponse = async (data) => {
    const markdownTables = markdownHelper.convertDataToMarkdown(data); 

    const content = `
    You are a data analyst. Summarize the economic trends for the given countries using the data below. Focus on GDP and population growth or decline. Be concise.

    ${markdownTables}

    Please provide an overall summary and any interesting observations. Use bullet points for clarity.
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

    return response.data;
}

module.exports = {
    generateResponse    
};

// TO-DO
// 1. Returns just the text

// 2. Returns the text and some charts