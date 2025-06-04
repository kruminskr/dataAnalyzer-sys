const queryModel = require('../models/query.model');
const dataModel = require('../models/data.model');
const aiModel = require('../models/ai.model');

const processQuery = (req, res) => {
    try {
        const userQuery = req.body.query;

        const neededData = queryModel.processQuery(userQuery);

        const data = dataModel.getData(neededData);

        // AI model generates a response based on the data - what should it return?
        // const aiResponse = aiModel.generateResponse(data);

        const response = {
            data,   
        }

        return res.status(200).json(
            response
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}

module.exports = {
    processQuery
};

