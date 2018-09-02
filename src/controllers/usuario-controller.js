'use strict';

const userRepo = require('../repositories/usuario-repo');
const md5 = require('md5');
const autenticacao = require('../services/autenticacao-service');

exports.post = async (req, res, next) => {
    try {
        await userRepo.create({
            nome: req.body.nome,
            email: req.body.email,
            login: req.body.login,
            senha: md5(req.body.senha + global.SALT_KEY)
        })
            .then(usuario => res.status(201).send({
                message: "Usuario cadastrado com sucesso!",
                data: usuario
            }))
            .catch(error => res.status(400).send({
                message: "Não foi possivel cadastrar o usuario.",
                erros: error
            }));
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.get = async (req, res, next) => {
    try {
        var data = await userRepo.get();
        if (data == '') {
            res.status(404).send({
                message: "Não há usuarios cadastrados."
            });
        } else {
            res.status(200).send(data);
        }
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await userRepo.getById(req.params.id);
        if (!data) {
            res.status(404).send({
                message: "Usuario não localizado."
            });
        } else {
            res.status(200).send(data);
        }
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.put = async (req, res, next) => {
    try {
        req.body.senha = md5(req.body.senha + global.SALT_KEY);
        await userRepo.update(req.params.id, req.body)
            .then(usuario => res.status(201).send({
                message: "Usuario alterado com sucesso!",
                data: usuario
            }))
            .catch(error => res.status(400).send({
                message: "Não foi possivel alterar o usuario.",
                erros: error
            }));
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const result = await userRepo.delete(req.params.id)
        if (result > 0) {
            res.status(200).send({
                message: 'Usuario deletado com sucesso!'
            });
        } else {
            res.status(404).send({
                message: 'Usuario não foi localizado!'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.logar = async(req, res, next) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: 'Usuario ou senha vazios!'
            })
            return;
        }
        req.body.senha = md5(req.body.senha + global.SALT_KEY);
        const result = await userRepo.login({ login: req.body.login, senha: req.body.senha });
        if (!result) {
            res.status(400).send({
                message: 'Usuario ou senha invalidos!'
            })
        } else {
            var token = autenticacao.generateToken({
                id: result.Id,
                login: result.Login
            });

            res.status(200).send({
                token: token,
                usuario: result,
                message: 'Usuario logado com sucesso!',
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao logar!'
        })
    }  
};
