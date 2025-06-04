const express = require('express');

const app = express();

app.use(express.json());

const v1Routes = require('./versions/v1/routes/index.js');

app.use('/api/v1', v1Routes);

module.exports = app;