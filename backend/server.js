//Projeto TET NATH

const express = require('express');
const mysql = require('mysql2');
const port = 3000;
const app = express();

var cors = require('cors');
app.use(express.static("public"));
app.use(cors());

app.use(express.json());
app.listen(port);

const db = {
    host: '54.173.126.116',
    port: 3306,
    user:'tet-conectamaes',
    password: 'conectamaes2024',
    database: 'tet-conectamaes'
};

const execSQLQuery = (sqlQry, id, res) => {
    const connection = mysql.createConnection(db);
    connection.query(sqlQry, id, (error, results, fields) => {
        if(error){
            res.json(error);
        }else{
            res.json(results);
        }
        connection.end();
        console.log('Executou: execSQLQuery');
    });
};

async function resultSQLQuery(sqlQry, id){
  const connection = await mysql.createConnection(db);
  let [result] = await connection.promise().query(sqlQry,id);
  try{
    return result;
    } catch (error){
      console.log("Erro: " + error);
      throw error;
    }
};

app.get('/', (req, res)=> {
    res.send('Tá funcionando!')
}); 

app.get('/showUsers', (req, res)=> {
    const id = []
    execSQLQuery("SELECT * FROM usuario", id, res)
}); 

app.post('/insertUser', (req, res)=> {
    const data = [req.body.nome, req.body.email, req.body.senha]
    execSQLQuery("INSERT INTO usuario VALUES (null,?,?,?)", data, res)
});

app.post('/login',async(req,res)=>{
  const id = [req.body.email, req.body.senha];
  let [result] = await resultSQLQuery('SELECT * FROM usuario WHERE email=? and senha=?', id);
  console.log(result)
  if(result){
    res.json({
      "mensagem":"Usuário logado, redirecionando...",
      "id":result.idUsuario 
    })
  }else{
    res.json({
      "mensagem":"Usuário Inválido"
    })
  }
});

app.get('/showUser/:id', (req, res) => {
  const id = [req.params.id]
  execSQLQuery('SELECT * FROM usuario WHERE idUsuario = ?;', id, res)
});

app.get('/showUserName/:id', (req, res) => {
  const id = [req.params.id]
  execSQLQuery('SELECT nomeCompleto FROM usuario WHERE idUsuario = ?;', id, res)
});

app.delete('/deleteNullUsers', (req, res) => {
  const id = [];
  const query = `DELETE FROM usuario WHERE email IS NULL OR email = '' OR nomeCompleto IS NULL OR nomeCompleto = '' OR senha IS NULL OR senha = '';`;
  execSQLQuery(query, id, res);
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = [req.params.id]
  execSQLQuery('DELETE FROM usuario WHERE idUsuario = ?;', id, res)
});

app.put('/editUser/:id', (req, res) => {
  const data = [req.body.nome, req.body.email, req.body.senha, req.params.id]
  execSQLQuery('UPDATE usuario set nomeCompleto = ?, email = ? , senha = ? WHERE idUsuario = ?;', data, res)
});