const express = require('express');

const router = express.Router();

const queryController = require('../services/controllers/query.controller');

router.post('/data', queryController.queyProcesor);

module.exports = router;