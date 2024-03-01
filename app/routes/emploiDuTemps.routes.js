const express = require("express");
const emploiDuTemps = require('../controllers/emploiDuTemps.controller')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create', emploiDuTemps.create);
app.get('/get/:id', emploiDuTemps.getEDT);
app.put('/update/:id', emploiDuTemps.update);

module.exports = app;