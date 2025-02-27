// IMPORTANDO BANCO DE DADOS //
const sqlite = require('sqlite3');



// CONFIGURANDO BANCO DE DADOS // 


    
    const db = new sqlite.Database('Database.sqlite', (err) => {
        if(!err){
            console.log(`Conexão com Banco de dados sucedida!`);
        } else {
            console.log(`Erro ao conectar com o Banco de dados!`);
        }
    });
    
    /*let usuarios = `CREATE TABLE IF NOT EXISTS usuarios(
    
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR (100),
    senha VARCHAR(100),
    confirmar_senha VARCHAR(100),
    administro_clinte VARCHAR(100)
    )`;

    db.run(usuarios, (err) => {
        if(err){
            console.log(`Erro ao criar tabela`, err);
        } else {
            console.log(`Tabela usuários criada com sucesso!`);
        }
    }) */


module.exports = { sqlite };

