const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const v1Routes = require('./versions/v1/routes/index.js');

app.use('/api/v1', v1Routes);

module.exports = app;