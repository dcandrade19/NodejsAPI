// força criterios javascript, gera mais avisos da IDE
'use strict'

// require sem caminho busca de node_module
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

// criando aplicação e setando a porta
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// criando servidor
const server = http.createServer(app);

// Escutar a porta
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

// Normalizar a porta
function normalizePort(val) {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }

    if(port>=0) {
        return port;
    }

    return false;
}

// Verificar erros da porta
function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Debug
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}