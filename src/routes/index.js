'use strict';

const express = require('express');
const router = express.Router();

// configurando primeira rota
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Funcionarios API",
        version: "0.0.4"
    });
});

module.exports = router;