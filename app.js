const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const {PORT, MONGO_URL} = require('./configs/config');
const router = require('./src/router');
const ApiError = require("./errors/ApiError");

const app = express();
app.use(express.json());  // For receiving 'req.body'.
app.use(express.urlencoded({extended: true}));

app.use('/', router);
app.use('*', (req, res, next) => {
  return next(new ApiError.NotFound(`Rout ${req.baseUrl} not found`));
});
app.use(mainErrorHandler);

app.listen(PORT, async () => {
  try {
    mongoose.set('debug', true);
    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(MONGO_URL);

    if (connection) {
      console.log('DB connected');
    }
  } catch (err) {
    if (err) console.log(err);
    process.exit(1);
  }
  console.log(`PORT: ${PORT} is listening...`);
});

function mainErrorHandler(err, req, res, next) {
  console.log(next, 'avoid warning unused next()');
  console.log(err); // log data to find error place

  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Unknown error'
    });
}