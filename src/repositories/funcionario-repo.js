'use strict';
// funcionario
const funcionario = require('../models/funcionario');

exports.get = async () => {
    const res = await funcionario.findAll({});
    return res;
}

exports.getById = async (id) => {
    const res = await funcionario.find({
        where: { id: id }
    });
    return res;
}

exports.create = async (data) => {
    const res = await funcionario.create(data);
    return res;
}

exports.update = async (id, data) => {
    const res = await funcionario.find({
        where: { id: id }
    }).then(funcionario => {
        return funcionario.updateAttributes(data);
    })
    return res;
}

exports.delete = async (id) => {
    const res = await funcionario.destroy({
        where: { id: id }
    })
    return res;
}