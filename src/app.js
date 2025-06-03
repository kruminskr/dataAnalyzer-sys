const express = require('express');

const app = express();

const v1Routes = require('./versions/v1/routes/index.js');

app.use('/api/v1', v1Routes);

module.exports = app;