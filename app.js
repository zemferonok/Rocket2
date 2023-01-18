const express = require('express');

require('dotenv').config(); // Activate .env data
const {PORT} = require('./configs/config');
const router = require('./src/router');

const app = express();
app.use(express.json());  // For receiving 'req.body'.
app.use(express.urlencoded({extended: true}));

app.use('/', router);
app.use('*', (req, res) => res.json('Rout not Found'));

app.listen(PORT, () => {
  console.log(`PORT: ${PORT} is listening..`);
});