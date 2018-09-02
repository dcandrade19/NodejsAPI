'use strict';
// sequelize
const sequelize = require('sequelize');
// Require conexao com banco
const db = require('../data/dbconnection');

const Usuarios = db.define('usuarios', {
    nome: {
        type: sequelize.STRING(150),
        validate: {
            notEmpty: true
        },
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        validate: {
            notEmpty: true,
            isEmail: true
        },
        allowNull: false
    },
    login: {
        type: sequelize.STRING(80),
        validate: {
            notEmpty: true,
        },
        allowNull: false
    },
    senha: {
        type: sequelize.STRING(32),
        validate: {
            notEmpty: true,
        },
        allowNull: false
    },
    // Timestamps
    createdAt: sequelize.DATE,
    updatedAt: sequelize.DATE,
});

module.exports = Usuarios;