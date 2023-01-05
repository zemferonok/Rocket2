const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const apiRouter = require('./api/api.router.js');
const {MONGO_URL, PORT} = require("./configs/variables");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL);    // Create & Connect to DB
mongoose.set('debug', true);    // Turn ON debug mode

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log('Listen', PORT, 'port');
});