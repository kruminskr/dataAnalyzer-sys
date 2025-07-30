const queryModel = require('../models/query.model');
const dataModel = require('../models/data.model');
const aiModel = require('../models/ai.model');

const processQuery = async (req, res, next) => {
    try {
        const userQuery = req.body.query;

        const queryAnalysis = await queryModel.processQuery(userQuery);

        const data = await dataModel.getData(queryAnalysis);

        const analysis = await aiModel.generateResponse(data, queryAnalysis);

        const response = {
            analysis,
            data,
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    processQuery
};


