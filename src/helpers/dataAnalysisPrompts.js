const generateAnalysisPrompt = (data, queryIntent, originalQuery, countries) => {
    const basePrompts = {
        comparison: `You are a comparative data analyst. Your task is to compare data between the specified countries, highlighting differences, similarities, and relative performance.`,
        
        trend_analysis: `You are a trend analyst. Focus on identifying patterns, trends, and changes over time in the provided data.`,
        
        current_status: `You are a market analyst. Provide an assessment of the current state based on the most recent data available.`,
        
        correlation: `You are a statistical analyst. Look for relationships and correlations between different metrics in the data.`,
        
        overview: `You are a data analyst. Provide a comprehensive overview of the housing market situation.`
    };

    const complexityInstructions = {
        simple: "Provide a clear, concise summary with 3-5 key points.",
        moderate: "Provide a detailed analysis with 5-8 key insights and supporting evidence.", 
        complex: "Provide a comprehensive analysis with multiple perspectives and 8-12 detailed findings."
    };

    const comparisonInstructions = queryIntent.requiresComparison 
        ? `\n\nIMPORTANT: This query requires comparing ${countries.join(' vs ')}. Structure your response to clearly show comparisons between these countries.`
        : '';

    const prompt = 
    `${basePrompts[queryIntent.primaryIntent] || basePrompts.overview}

    Original Query: "${originalQuery}"

    Analysis Requirements:
    - Type: ${queryIntent.analysisType}
    - Complexity: ${queryIntent.complexity}
    - Actions needed: ${queryIntent.specificActions.join(', ')}
    ${comparisonInstructions}

    ${complexityInstructions[queryIntent.complexity]}

    Data to analyze:
    ${data}

    Provide your analysis based on the requirements above.`;

    return prompt;
};

module.exports = {
    generateAnalysisPrompt
};