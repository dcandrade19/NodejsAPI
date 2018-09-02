'use strict';

const funcRepo = require('../repositories/funcionario-repo');

exports.post = async(req, res, next) => {
    try {
        await funcRepo.create({
            nome: req.body.nome,
            cpf: req.body.cpf,
            setor: req.body.setor,
            datacontratacao: req.body.datacontratacao
        })
        .then(funcionario => res.status(201).send({
            message: "Funcionario cadastrado com sucesso!",
            data: funcionario
        }))
        .catch(error => res.status(400).send({
            message: "Não foi possivel cadastrar o funcionario.",
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
        var data = await funcRepo.get();
        if(data == '') {
            res.status(404).send({
                message: "Não há funcionarios cadastrados."
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

exports.getById = async (req, res, next) => {
    try {
        var data = await funcRepo.getById(req.params.id);
        if(!data) {
            res.status(404).send({
                message: "Funcionario não localizado."
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
        await funcRepo.update(req.params.id, req.body)
        .then(funcionario => res.status(201).send({
            message: "Funcionario alterado com sucesso!",
            data: funcionario
        }))
        .catch(error => res.status(400).send({
            message: "Não foi possivel alterar o funcionario.",
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
        const result = await funcRepo.delete(req.params.id)
        if(result > 0) {
            res.status(200).send({
                message: 'Funcionario deletado com sucesso!'
            });
        } else {
            res.status(404).send({
                message: 'Funcionario não foi localizado!'
            });
        }   
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }          
};