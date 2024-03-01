const express = require('express');
const rendezvous = require('../controllers/rendezvous.controller');
const bodyParser = require('body-parser');
const { checkSchedule } = require('../controllers/checkSchedule')

const app = express();

app.get('/all', rendezvous.findAll);
app.post('/create', checkSchedule, rendezvous.create);
app.put('/update/:id', rendezvous.updateState);
app.get('/myappointment/:id', rendezvous.findClient);
app.get('/mytasks/:id', rendezvous.findTasks);
app.get('/getemployes/:id', rendezvous.getEmployes);

module.exports = app;
