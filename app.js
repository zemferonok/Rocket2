const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const router = require('./src/router.js');
const {MONGO_URL, PORT} = require("./configs/config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', router);
app.use('*', (req, res) => {
    res.json('Route not found');
});

mongoose.set('debug', true);

app.listen(PORT, async () => {
    try {
        mongoose.set('strictQuery', true);
        const connection = await mongoose.connect(MONGO_URL);

        if (connection) {
            console.log('DB connected', MONGO_URL);
        }
    } catch (err) {
        if (err) console.log(err);
        process.exit(1);
    }
    console.log(`PORT: ${PORT} is listening`);
});