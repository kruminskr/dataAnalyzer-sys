const generateAnalysisPrompt = (data, queryIntent, originalQuery, countries) => {
    const basePrompts = {
        comparison: `You are a comparative data analyst. Compare the specified countries (${countries.join(' vs ')}) using the provided Eurostat dataset, highlighting differences, similarities, and relative performance in metrics like House Price Index (HPI), Housing Cost Overburden, or Overcrowding Rate.`,
        trend_analysis: `You are a trend analyst. Identify patterns, trends, and changes over time in the provided Eurostat dataset for the specified countries and metrics, focusing on temporal dynamics.`,
        current_status: `You are a market analyst. Assess the most recent data in the provided Eurostat dataset to describe the current state of the housing market for the specified countries.`,
        correlation: `You are a statistical analyst. Analyze relationships and correlations between metrics (e.g., HPI and Overcrowding Rate) in the provided Eurostat dataset for the specified countries.`,
        overview: `You are a data analyst. Provide a comprehensive overview of the housing market situation for the specified countries using the provided Eurostat dataset.`
    };

    const complexityInstructions = {
        simple: `Provide a concise analysis (150-200 words) with 3-5 key points, a summary table, and one Chart.js configuration for the primary metric (e.g., HPI).`,
        moderate: `Provide a detailed analysis (250-300 words) with 5-8 key insights, a summary table, and Chart.js configurations for up to two metrics (e.g., HPI, Overcrowding Rate).`,
        complex: `Provide a comprehensive analysis (300-400 words) with 8-12 detailed findings, a summary table, and Chart.js configurations for all relevant metrics.`
    };

    const comparisonInstructions = queryIntent.requiresComparison 
        ? `This query requires comparing ${countries.join(' vs ')}. Structure the analysis to clearly compare metrics across these countries, including a summary table with columns: Metric, ${countries.join(', ')}, Comparison.` 
        : `Focus on the specified country/countries without direct comparisons unless relevant.`;

    const prompt = 
    `${basePrompts[queryIntent.primaryIntent] || basePrompts.overview}

    Original Query: "${originalQuery}"

    Analysis Requirements:
    - Type: ${queryIntent.analysisType}
    - Complexity: ${queryIntent.complexity}
    - Actions needed: ${queryIntent.specificActions.join(', ')}
    - Output Format: Return a JSON object with:
      - analysis: {
          text: string (summary of key findings, ${complexityInstructions[queryIntent.complexity].match(/(\d+-\d+)/)[0]} words),
          points: [{ metric: string, description: string }],
          limitations: string (note missing metrics or years, e.g., "No building permits data available")
        }
      - charts: [Chart.js configurations, e.g., { type: "line", data: { labels: [], datasets: [] }, options: {} }]
    - Use only the provided dataset. Do not include external factors (e.g., migration, regulations, economic development) unless explicitly supported.
    - For charts, generate configurations for ${queryIntent.complexity === 'simple' ? 'the primary metric (e.g., HPI)' : queryIntent.complexity === 'moderate' ? 'up to two metrics' : 'all relevant metrics'}. Use line charts for time-series data (e.g., HPI) and bar charts for comparisons (e.g., Overcrowding Rate). Use distinct colors (e.g., #FF6384 for ${countries[0]}, #36A2EB for ${countries[1] || countries[0]}).
    - Keep language simple for non-expert users.

    ${comparisonInstructions}

    ${complexityInstructions[queryIntent.complexity]}

    Data to analyze:
    ${JSON.stringify(data)}

    Return the analysis as a JSON object adhering to the specified format.`;

    return prompt;
};

module.exports = {
    generateAnalysisPrompt
};