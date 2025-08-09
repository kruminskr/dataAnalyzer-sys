const express = require('express');

const router = express.Router();

const queryController = require('../services/controllers/query.controller');

const errorHandler = require('../../../middleware/error.middleware')

router.get('/health', (req, res) => res.sendStatus(200));

router.post('/data', queryController.processQuery);

router.use(errorHandler);

module.exports = router;