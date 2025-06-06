const express = require('express');

const router = express.Router();

const queryController = require('../services/controllers/query.controller');

const errorHandler = require('../../../middleware/error.middleware')

router.post('/data', queryController.processQuery);

router.use(errorHandler);

module.exports = router;