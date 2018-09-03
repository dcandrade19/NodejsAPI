'use strict'
// Sql
const sqlUsuarios = "CREATE TABLE IF NOT EXISTS usuarios (\n" +
"id int NOT NULL AUTO_INCREMENT, \n" +
"nome varchar(150) NOT NULL, \n" +
"email varchar(255) NOT NULL, \n" +
"login varchar(80) NOT NULL, \n" +
"senha char(32) NOT NULL, \n" +
"createdAt date DEFAULT NULL, \n" +
"updatedAt date DEFAULT NULL, \n" +
"PRIMARY KEY (id) \n" +
");";
const sqlFuncionarios = "CREATE TABLE IF NOT EXISTS funcionarios (\n" +
"id int NOT NULL AUTO_INCREMENT, \n" +
"nome varchar(150) NOT NULL, \n" +
"cpf char(14) NOT NULL, \n" +
"setor varchar(80) NOT NULL, \n" +
"datacontratacao date NOT NULL, \n" +
"createdAt date DEFAULT NULL, \n" +
"updatedAt date DEFAULT NULL, \n" +
"PRIMARY KEY (ID) \n" +
");";

const insertFunc = "INSERT INTO funcionarios (\n" +
"nome, \n" +
"cpf, \n" +
"setor, \n" +
"datacontratacao) \n" +
"VALUES \n" +
"('Joao da Silva', \n" +
"'123.456.456-45', \n" +
"'Juridico', \n" +
"'2018-01-03'), \n" +
"('Maria da Silva', \n" +
"'992.888.111-45', \n" +
"'TI', \n" +
"'2018-05-04'), \n" +
"('Manoel da Silva', \n" +
"'777.222.456-45', \n" +
"'Financeiro', \n" +
"'2016-03-03');";

// Require do mysql
const config = require('../src/config');
const sequelize = require('sequelize');

const connection = new sequelize("", config.user, config.password, {
    host: config.host,
    dialect: config.dialect
  });

  async function create() {
    const res = await connection.query("CREATE DATABASE IF NOT EXISTS `"+ config.database +"`;");
    if(res){
        const connectionnew = await new sequelize(config.database, config.user, config.password, {
            host: config.host,
            dialect: config.dialect
          });
    
    // Verificando conexão
    await connectionnew.query(sqlUsuarios);
    
    await connectionnew.query(sqlFuncionarios);

    await connectionnew.query(insertFunc);
    } 
}

create();
// Criando base