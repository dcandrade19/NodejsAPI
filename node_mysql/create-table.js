'use strict'
// Sql
const sqlUsuarios = "CREATE TABLE IF NOT EXISTS Usuarios (\n" +
"ID int NOT NULL AUTO_INCREMENT, \n" +
"Login varchar(150) NOT NULL, \n" +
"Senha varchar(20) NOT NULL, \n" +
"PRIMARY KEY (ID) \n" +
");";
const sqlFuncionarios = "CREATE TABLE IF NOT EXISTS Funcionarios (\n" +
"ID int NOT NULL AUTO_INCREMENT, \n" +
"Nome varchar(150) NOT NULL, \n" +
"CPF char(11) NOT NULL, \n" +
"PRIMARY KEY (ID) \n" +
");";
// Require do mysql
const mysql = require('mysql');

// Criando conexão com a base
const connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '',
    database : 'dbestagio'
});

// Verificando conexão
connection.connect(function(erro){
    if(erro) return console.log(erro);
    console.log('Connectado ao Banco.');
    createTable(connection,sqlUsuarios);
    createTable(connection,sqlFuncionarios);
});

// Criar tabela 'if not exists'
function createTable(conn, sqlString) {
    const sql = sqlString;
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('Tabela criada.');
    });
}