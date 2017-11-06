var config = require('../config/config.json');
var sequelize = require('sequelize');
var sequel = new sequelize(config.database, config.username, config.password, config);
sequel.authenticate();
module.exports = sequel;
