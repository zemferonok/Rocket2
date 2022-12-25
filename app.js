const express = require('express');

require('dotenv').config();     // Init .env data
const apiRouter = require('./api/api.router.js');
const {PORT} = require('./configs/variables.js');

const app = express();
app.use(express.json());    // For body params from request
app.use(express.urlencoded({extended: true}));  // For query

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log('Listen', PORT, 'port');
});