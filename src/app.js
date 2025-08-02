const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: process.env.APP_URL
}));

const v1Routes = require('./versions/v1/routes/index.js');

app.use('/api/v1', v1Routes);

module.exports = app;