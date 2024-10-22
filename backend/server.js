const express = require('express');
const mysql = require('mysql2');
const port = 3000;
const app = express();

const cors = require('cors');
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const db = {
    host: '54.173.126.116',
    port: 3306,
    user: 'tet-conectamaes',
    password: 'conectamaes2024',
    database: 'tet-conectamaes'
};

const execSQLQuery = (sqlQry, params, res) => {
    const connection = mysql.createConnection(db);
    connection.query(sqlQry, params, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
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

app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Buscar todos os usuários
app.get('/showUsers', (req, res) => {
    execSQLQuery("SELECT * FROM Usuario", [], res);
});

// Inserir um novo usuário
app.post('/insertUser ', (req, res) => {
    const { nomeCompleto, nomeDeUsuario, email, senha, telefone, estado, dataNascimentoUsuario, tema, isAdmin, linkFotoPerfil } = req.body;
    const data = [nomeCompleto, nomeDeUsuario, email, senha, telefone, estado, dataNascimentoUsuario, tema, isAdmin, linkFotoPerfil];
    execSQLQuery("INSERT INTO Usuario (nomeCompleto, nomeDeUsuario, email, senha, telefone, estado, dataNascimentoUsuario, tema, isAdmin, linkFotoPerfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", data, res);
});

// Login do usuário
app.post('/login',async(req,res)=>{
  const id = [req.body.email, req.body.senha];
  let [result] = await resultSQLQuery('SELECT * FROM Usuario WHERE email=? and senha=?', id);
  console.log(result)
  if(result){
    res.json({
      "mensagem":"",
      "id":result.idUsuario 
    })
  }else{
    res.json({
      "mensagem":"Usuário inválido!"
    })
  }
});

// Buscar um usuário específico
app.get('/showUser/:id', (req, res) => {
    execSQLQuery('SELECT * FROM Usuario WHERE idUsuario = ?', [req.params.id], res);
});

app.get('/getUserProperty/:id/:property', (req, res) => {
    const data = [req.params.id];
    execSQLQuery('SELECT '+ req.params.property + ' FROM Usuario WHERE idUsuario = ?', data , res);
});

// Deletar um usuário específico
app.delete('/deleteUser/:id', (req, res) => {
    execSQLQuery('DELETE FROM Usuario WHERE idUsuario = ?', [req.params.id], res);
});

// Editar um usuário
app.put('/editUser/:id', (req, res) => {
    const { nomeCompleto, email, senha, telefone, biografia, estado, dataNascimentoUsuario, tema, isAdmin, linkFotoPerfil, chavePix } = req.body;
    const data = [nomeCompleto, email, senha, telefone, biografia, estado, dataNascimentoUsuario, tema, isAdmin, linkFotoPerfil, chavePix, req.params.id];
    execSQLQuery('UPDATE Usuario SET nomeCompleto = ?, email = ?, senha = ?, telefone = ?, biografia = ?, estado = ?, dataNascimentoUsuario = ?, tema = ?, isAdmin = ?, linkFotoPerfil = ?, chavePix = ? WHERE idUsuario = ?', data, res);
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});