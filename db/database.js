const config = require('../config/config.json');
const sequelize = require('sequelize');
const sequel = new sequelize(config.database, config.username, config.password, config);
sequel.authenticate();
module.exports = sequel;
