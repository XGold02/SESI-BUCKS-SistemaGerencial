const jsonwebtoken = require('jsonwebtoken');

function verificarAutenticacao(req, res, next) {
    const token = req.cookies.Token; 

    if (!token) {
        return res.redirect('/');
    }

    try {
        const usuario = jsonwebtoken.verify(token, 'SenhaParaProtogerOToken');
        req.usuario = usuario; 
        next(); 
    } catch (err) {
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
}

module.exports = verificarAutenticacao;