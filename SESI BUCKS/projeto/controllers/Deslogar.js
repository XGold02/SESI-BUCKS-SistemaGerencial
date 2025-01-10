async function Logout(req, res) {
    try {
        // Limpa o cookie 'Token' para realizar o logout
        res.clearCookie('Token');
        
        // Redireciona para a página de login
        return res.redirect('/');
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = Logout;