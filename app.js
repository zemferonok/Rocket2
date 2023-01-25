const express = require('express');

require('dotenv').config(); // Activate .env data
const {PORT} = require('./configs/config');
const router = require('./src/router');
const ApiError = require("./errors/ApiError");

const app = express();
app.use(express.json());  // For receiving 'req.body'.
app.use(express.urlencoded({extended: true}));

app.use('/', router);
app.use('*', (req, res, next) => {
  return next(new ApiError.NotFound(`Rout ${req.baseUrl} not found`));
});
app.use(mainErrorHandler);  // Catch every 'next(e)' with Error

app.listen(PORT, () => {
  console.log(`PORT: ${PORT} is listening..`);
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