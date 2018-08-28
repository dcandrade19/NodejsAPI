'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Carregar as Rotas
const index = require('./routes/index');
const product = require('./routes/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/products', product);

module.exports = app;