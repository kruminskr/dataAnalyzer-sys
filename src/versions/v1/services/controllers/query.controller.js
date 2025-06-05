const queryModel = require('../models/query.model');
const dataModel = require('../models/data.model');
const aiModel = require('../models/ai.model');

const processQuery = async (req, res) => {
    try {
        const userQuery = req.body.query;

        const neededData = queryModel.processQuery(userQuery);

        const data = await dataModel.getData(neededData);

        const aiResponse = await aiModel.generateResponse(data);

        return res.status(200).json(
            aiResponse
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}

module.exports = {
    processQuery
};

