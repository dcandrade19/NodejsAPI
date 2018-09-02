'use strict'

const jwt = require('jsonwebtoken');

// Gerar token
exports.generateToken = (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

// Decodificar token recebido
exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

// Autorizar usuario
exports.authorize = function (req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token) {
        res.status(401).json({
            message: 'Acesso restrito a usuarios logados.'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded){
            if(error) {
                res.status(401).json({
                    message: 'O token não é valido!'
                });
            } else {
                next();
            }
        });
    }
};