'use strict';

// sequelize
const sequelize = require('sequelize');
// Require conexao com banco
const db = require('../data/dbconnection');

const Funcionarios = db.define('funcionarios', {
    nome: {
        type: sequelize.STRING(150),
        validate: {
            notEmpty: true
        },
        allowNull: false
    },
    cpf: {
        type: sequelize.STRING(14),
        validate: {
            notEmpty: true
        },
        allowNull: false
    },
    setor: {
        type: sequelize.STRING(80),
        validate: {
            notEmpty: true,
        },
        allowNull: false
    },
    datacontratacao: {
        type: sequelize.DATEONLY,
        validate: {
            isDate: true,         
        },
        allowNull: false
    },
    // Timestamps
    createdAt: sequelize.DATE,
    updatedAt: sequelize.DATE,
});

module.exports = Funcionarios;