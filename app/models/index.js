const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.client = require("./client.model");
db.employe = require("./employe.model")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;