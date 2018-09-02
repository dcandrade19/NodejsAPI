'use strict';
// usuario
const usuario = require('../models/usuario');

exports.get = async () => {
    const res = await usuario.findAll({});
    return res;
}

exports.getById = async (id) => {
    const res = await usuario.find({
        where: { id: id }
    });
    return res;
}

exports.create = async (data) => {
    const res = await usuario.create(data);
    return res;
}

exports.update = async (id, data) => {
    const res = await usuario.find({
        where: { id: id }
    }).then(usuario => {
        return usuario.updateAttributes(data);
    })
    return res;
}

exports.delete = async (id) => {
    const res = await usuario.destroy({
        where: { id: id }
    })
    return res;
}

exports.login = async (data) => {
    const res = await usuario.findOne({
        where: {
            login: data.login,
            senha: data.senha
        }
    });
    return res;
}