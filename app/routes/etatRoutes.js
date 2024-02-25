const express = require("express");
const etatController = require('../controllers/etats')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/etat', etatController.findAll);
app.get('/etat/detail/:id', etatController.findOne);
app.post('/etat/create', etatController.create);
app.patch('/etat/update/:id', etatController.update);
app.delete('/etat/delete/:id', etatController.destroy);

module.exports = app;