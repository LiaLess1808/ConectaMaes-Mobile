const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const port = 3000;
const app = express();

// Configurações do Express
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Chave privada para o JWT
const privateKey = "conectamaes.linceonline.com.br.200420052005.web_token";

// Configuração do banco de dados
const db = {
    host: '54.173.126.116',
    port: 3306,
    user: 'tet-conectamaes',
    password: 'conectamaes2024',
    database: 'tet-conectamaes'
};

// Middleware para verificar JWT
const middlewareVerifyJWT = (req, res, next) => {
    const jwtToken = req.headers["authorization"];
    jwt.verify(jwtToken, privateKey, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }
        req.userInfo = userInfo;
        next();
    });
};

// Função para executar consultas SQL
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

// Função assíncrona para consulta SQL
async function resultSQLQuery(sqlQry, id) {
    const connection = await mysql.createConnection(db);
    let [result] = await connection.promise().query(sqlQry, id);
    try {
        return result;
    } catch (error) {
        console.log("Erro: " + error);
        throw error;
    }
}

// Rotas
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Buscar todos os usuários
app.get('/showUsers', middlewareVerifyJWT, (req, res) => {
    execSQLQuery("SELECT * FROM Usuario", [], res);
});

// Buscar um usuário específico
app.get('/showUser/:id', middlewareVerifyJWT, (req, res) => {
    execSQLQuery('SELECT * FROM Usuario WHERE idUsuario =?', [req.params.id], res);
});

// Endpoint para buscar uma propriedade do usuário
app.get('/getUserProperty/:id/:property', middlewareVerifyJWT, (req, res) => {
    const data = [req.params.id];
    execSQLQuery('SELECT ' + req.params.property + ' FROM Usuario WHERE idUsuario =?', data, res);
});

// Inserir um novo usuário
app.post('/insertUser', (req, res) => {
    const { nomeCompleto, nomeDeUsuario, email, senha, telefone, estado, dataNascimentoUsuario, tema, isAdmin, linkFotoPerfil } = req.body;
    const data = [nomeCompleto, nomeDeUsuario, email, senha, telefone, estado, dataNascimentoUsuario, tema, isAdmin, linkFotoPerfil];
    execSQLQuery("INSERT INTO Usuario (nomeCompleto, nomeDeUsuario, email, senha, telefone, estado, dataNascimentoUsuario, tema, isAdmin, linkFotoPerfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", data, res);
});

// Login do usuário
app.post('/login', async (req, res) => {
    const id = [req.body.email, req.body.senha];
    let [result] = await resultSQLQuery('SELECT * FROM Usuario WHERE email=? and senha=?', id);
    console.log(result);

    if (result) {
        jwt.sign(req.body, privateKey, (err, token) => {
            if (err) {
                res.status(500).json({ mensagem: "Erro ao gerar o JWT" });
                return;
            }

            console.log(token);
            res.set("x-access-token", token);
            res.json({
                mensagem: "",
                id: result.idUsuario, // Adicionei o id aqui
                "token": token
            });
        });
    } else {
        res.json({
            mensagem: "Usuário inválido!"
        });
    }
});

// Editar um usuário
app.put('/editUser/:id', middlewareVerifyJWT, (req, res) => {
    const { nomeCompleto, email, senha, telefone, biografia, estado, dataNascimentoUsuario, tema, isAdmin, linkFotoPerfil, chavePix } = req.body;
    const data = [nomeCompleto, email, senha, telefone, biografia, estado, dataNascimentoUsuario, tema, isAdmin, linkFotoPerfil, chavePix, req.params.id];
    execSQLQuery('UPDATE Usuario SET nomeCompleto =?, email =?, senha =?, telefone =?, biografia =?, estado = ?, dataNascimentoUsuario =?, tema =?, isAdmin =?, linkFotoPerfil =?, chavePix =? WHERE idUsuario =?', data, res);
});

// Deletar um usuário específico
app.delete('/deleteUser/:id', middlewareVerifyJWT, (req, res) => {
    execSQLQuery('DELETE FROM Usuario WHERE idUsuario = ?', [req.params.id], res);
});

// Endpoint para criar uma nova publicação
app.post('/posts', middlewareVerifyJWT, (req, res) => {
    const { conteudoEnvio, tituloEnvio, isConcluidoEnvio, currentUserId, postType } = req.body;

    if (!conteudoEnvio) {
        return res.status(400).send('Conteúdo não pode estar vazio.');
    }

    const tipoPublicacaoEnvio = postType;
    const conteudo = conteudoEnvio;
    const titulo = tituloEnvio ? tituloEnvio : null;
    const isConcluido = isConcluidoEnvio ? isConcluidoEnvio : 0;
    const idUsuarioQuePostou = currentUserId;
    const linkAnexoEnvio = '';

    const insertNewPost = INSERT INTO Publicacao (tipoPublicacao, conteudo, linkAnexo, titulo, isConcluido, idUsuario) VALUES (?, ?, ?, ?, ?, ?);
    const data = [tipoPublicacaoEnvio, conteudo, linkAnexoEnvio, titulo, isConcluido, idUsuarioQuePostou];

    execSQLQuery(insertNewPost, data, res);
});

// Buscar todas as publicações
app.get('/showPosts', middlewareVerifyJWT, (req, res) => {
    execSQLQuery("SELECT * FROM Publicacao", [], res);
});

// Endpoint para buscar publicações
app.get('/posts', middlewareVerifyJWT, (req, res) => {
    const postType = req.query.postType || '';
    const whereClause = postType === '' ? "p.tipoPublicacao <> 'Auxilio'" : p.tipoPublicacao = ?;

    const baseQuery = `
        SELECT 
            p.idPublicacao, 
            p.tipoPublicacao, 
            p.conteudo, 
            p.titulo, 
            p.dataCriacaoPublicacao, 
            u.idUsuario, 
            u.nomeCompleto, 
            u.nomeDeUsuario, 
            u.linkFotoPerfil,
            u.estado,
            (SELECT COUNT(*) FROM curtirPublicacao c WHERE c.idPublicacao = p.idPublicacao) as totalLikes
        FROM 
            Publicacao p
        JOIN 
            Usuario u ON p.idUsuario = u.idUsuario WHERE ${whereClause}
        ORDER BY p.dataCriacaoPublicacao DESC
    `;

    const data = postType === '' ? [] : [postType];

    execSQLQuery(baseQuery, data, res);
});

// Buscar uma publicação específica
app.get('/showPost/:id', middlewareVerifyJWT, (req, res) => {
    execSQLQuery('SELECT * FROM Publicacao WHERE idPublicacao = ?', [req.params.id], res);
});

// Editar uma publicação
app.put('/editPost/:id', middlewareVerifyJWT, (req, res) => {
    const { tipoPublicacao, conteudo, linkAnexo, titulo, isAnonima, isConcluido } = req.body;
    const data = [tipoPublicacao, conteudo, linkAnexo, titulo, isAnonima, isConcluido, req.params.id];
    execSQLQuery('UPDATE Publicacao SET tipoPublicacao = ?, conteudo = ?, linkAnexo = ?, titulo = ?, isAnonima = ?, isConcluido = ? WHERE idPublicacao = ?', data, res);
});

// Deletar uma publicação específica
app.delete('/deletePost/:id', middlewareVerifyJWT, (req, res) => {
    execSQLQuery('DELETE FROM Publicacao WHERE idPublicacao = ?', [req.params.id], res);
});

// Endpoint para lidar com likes
app.post('/posts/:id/like', middlewareVerifyJWT, (req, res) => {
    const idPost = req.params.id;
    const idUser = req.body.idUser;

    const queryLike = SELECT * FROM curtirPublicacao WHERE idPublicacao = ? AND idUsuario = ?;
    const data = [idPost, idUser];

    execSQLQuery(queryLike, data, (err, results) => {
        if (err) {
            return res.status(500).send(Erro ao buscar like: ${err.message});
        }

        if (!results.length) {
            // Inserir like
            const insertLike = INSERT INTO curtirPublicacao (idPublicacao, idUsuario) VALUES (?, ?);
            execSQLQuery(insertLike, [idPost, idUser], res);
        } else {
            // Remover like
            const deleteLike = DELETE FROM curtirPublicacao WHERE idPublicacao = ? AND idUsuario = ?;
            execSQLQuery(deleteLike, data, res);
        }
    });
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(API rodando em http://localhost:${port});
});
