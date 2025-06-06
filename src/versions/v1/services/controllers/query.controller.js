const queryModel = require('../models/query.model');
const dataModel = require('../models/data.model');
const aiModel = require('../models/ai.model');

const processQuery = async (req, res, next) => {
    try {
        const userQuery = req.body.query;

        const neededData = queryModel.processQuery(userQuery);

        const data = await dataModel.getData(neededData);

        const aiResponse = await aiModel.generateResponse(data);

        const response = {
            query: userQuery,
            analysis: aiResponse,
            metadata: {
                countries: neededData.countries,
                indicatrors: neededData.dataType,
                years: neededData.years,
            }
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    processQuery
};

