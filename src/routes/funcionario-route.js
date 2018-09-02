'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/funcionario-controller');
const autenticacao = require('../services/autenticacao-service');
const app = express()
const cors = require('cors')

app.use(cors())
// autenticacao.authorize

// configurando rota post create
router.post('/', autenticacao.authorize, controller.post);

// configurando rota put
router.put('/:id', autenticacao.authorize, controller.put);

// configurando rota delete
router.delete('/:id', autenticacao.authorize, controller.delete);

// configurando rota get
router.get('/', autenticacao.authorize, controller.get);

router.get('/:id', autenticacao.authorize, controller.getById);

module.exports = router;