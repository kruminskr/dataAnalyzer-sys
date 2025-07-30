const cleanAIResponse = (response) => {
    const jsonMatch = response.match(/\[.*\]|\{.*\}/s); // Match either array or object

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

module.exports = {
    cleanAIResponse 
};