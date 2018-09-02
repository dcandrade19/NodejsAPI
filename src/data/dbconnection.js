'use strict';

const config = require('../config');
const sequelize = require('sequelize');

const connection = new sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect
  });

module.exports = connection;