const connection = require('../models/db');
const jsonwebtoken = require('jsonwebtoken');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

async function Logar(body, res) {
    const { usuario_email, usuario_senha } = body; 

    if (!usuario_email || !usuario_senha) {
        return res.json({ erro: 'Dados insuficientes' });
    }
    
    try {
        const results = await query('SELECT * FROM usuarios WHERE email_usuarios = ? AND senha_usuarios = ?', [usuario_email, usuario_senha]);
        
        if (results.length === 0) {
            return res.redirect('/usuarios?erro=true');
        }

        const user = results[0];
        const token = jsonwebtoken.sign({
            usuario_email: user.usuario_email,
        }, 'SenhaParaProtogerOToken');

        res.cookie('Token', token);
        return res.redirect('/index');
        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = Logar;
