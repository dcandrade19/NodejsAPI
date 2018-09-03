'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

// use it before all route definitions
app.use(cors({origin: '*'}));

// Carregar as Rotas
const index = require('./routes/index');
const funcionarioRoute = require('./routes/funcionario-route');
const usuarioRoute = require('./routes/usuario-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/funcionarios', funcionarioRoute);
app.use('/usuarios', usuarioRoute);

module.exports = app;