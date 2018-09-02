'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');
const autenticacao = require('../services/autenticacao-service');

// autenticacao.authorize

// configurando rota post create
router.post('/', controller.post);

// configurando rota put
router.put('/:id', autenticacao.authorize, controller.put);

// configurando rota delete
router.delete('/:id', autenticacao.authorize, controller.delete);

// configurando rota get
router.get('/:id?', autenticacao.authorize, controller.get);

// Logar usuario
router.post('/logar', controller.logar);

module.exports = router;