'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

// configurando rota post create
router.post('/', controller.post);

// configurando rota put
router.put('/:id', controller.put);

// configurando rota delete
router.delete('/', controller.delete);

module.exports = router;