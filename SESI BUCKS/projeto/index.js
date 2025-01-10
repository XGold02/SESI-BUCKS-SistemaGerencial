const express = require('express'); 
const connection = require('./models/db');
const path = require('path');
const util = require('util');
const app = express(); 
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Controllers de login
const Logar = require('./controllers/Logar');
const Deslogar = require('./controllers/Deslogar');
const verificarAutenticacao = require('./controllers/verificarAutentificacao');

// Promisify for using promises
const query = util.promisify(connection.query).bind(connection);

// Rota para listar produtos
app.get('/api/produtos', verificarAutenticacao, async (req, res) => {
    try {
        const results = await query('SELECT * FROM produtos');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para inserir produtos
app.post('/api/produtos', verificarAutenticacao, async (req, res) => {
    const { nome_produtos, valor_produtos, tipo_produtos, qtd_produtos, tamanho_produtos, descrição_produtos } = req.body;
    try {
        const results = await query(
            'INSERT INTO produtos (nome_produtos, valor_produtos, tipo_produtos, qtd_produtos, tamanho_produtos, descrição_produtos) VALUES (?, ?, ?, ?, ?, ?)', 
            [nome_produtos, valor_produtos, tipo_produtos, qtd_produtos, tamanho_produtos, descrição_produtos]
        );
        res.status(201).json({ codigo_produtos: results.insertId });
    } catch (err) {
        console.error('Erro no MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

// Rota para atualizar produtos
app.put('/api/produtos/:codigo_produtos', verificarAutenticacao, async (req, res) => {
    const { codigo_produtos } = req.params; 
    const { nome_produtos, valor_produtos, tipo_produtos, qtd_produtos, tamanho_produtos, descrição_produtos } = req.body;
    
    try {
        const results = await query(
            'UPDATE produtos SET nome_produtos = ?, valor_produtos = ?, tipo_produtos = ?, qtd_produtos = ?, tamanho_produtos = ?, descrição_produtos = ? WHERE codigo_produtos = ?', 
            [nome_produtos, valor_produtos, tipo_produtos, qtd_produtos, tamanho_produtos, descrição_produtos, codigo_produtos]
        );
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (err) {
        console.error('Erro no MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

// Rota para deletar produtos
app.delete('/api/produtos/:codigo_produtos', verificarAutenticacao, async (req, res) => {
    const { codigo_produtos } = req.params; 
    
    try {
        const results = await query('DELETE FROM produtos WHERE codigo_produtos = ?', [codigo_produtos]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (err) {
        console.error('Erro no MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});


// Rota para inserir vendas
app.post('/api/vendas', verificarAutenticacao, async (req, res) => {
    const { nomecliente_vendas, pagamento_vendas, data_vendas, mesa_vendas, telefone_vendas, valortotal_vendas } = req.body;

    try {
        const results = await query(
            'INSERT INTO projeto.vendas (nomecliente_vendas, pagamento_vendas, data_vendas, mesa_vendas, telefone_vendas, valortotal_vendas) VALUES (?, ?, ?, ?, ?, ?)', 
            [nomecliente_vendas, pagamento_vendas, data_vendas, mesa_vendas, telefone_vendas, valortotal_vendas]
        );
        res.status(201).json({ id_vendas: results.insertId });
    } catch (err) {
        console.error('Erro no MySQL:', err);  
        res.status(500).json({ error: 'Erro ao inserir venda. Por favor, verifique os dados enviados.' });
    }
});

// Rota para atualizar vendas
app.put('/api/vendas/:codigo_vendas', verificarAutenticacao, async (req, res) => {
    const { codigo_vendas } = req.params; 
    const { nomecliente_vendas, pagamento_vendas, data_vendas, mesa_vendas, telefone_vendas, valortotal_vendas } = req.body;
    
    try {
        const results = await query(
            'UPDATE vendas SET nomecliente_vendas = ?, pagamento_vendas = ?, data_vendas = ?, mesa_vendas = ?, telefone_vendas = ?, valortotal_vendas = ? WHERE codigo_vendas = ?', 
            [nomecliente_vendas, pagamento_vendas, data_vendas, mesa_vendas, telefone_vendas, valortotal_vendas, codigo_vendas]
        );
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Venda não encontrada' });
        }

        res.json({ message: 'Venda atualizada com sucesso' });
    } catch (err) {
        console.error('Erro no MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

// Rota para deletar vendas
app.delete('/api/vendas/:codigo_vendas', verificarAutenticacao, async (req, res) => {
    const { codigo_vendas } = req.params; 

    try {
        const results = await query('DELETE FROM vendas WHERE codigo_vendas = ?', [codigo_vendas]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Venda não encontrada' });
        }
        res.json({ message: 'Venda deletada com sucesso' });
    } catch (err) {
        console.error('Erro no MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});



app.get('/api/vendas/total', verificarAutenticacao, async (req, res) => {
    try {
        const result = await query('SELECT SUM(CAST(valortotal_vendas AS DECIMAL(10, 2))) AS total_vendas FROM projeto.vendas');
        const totalVendas = result[0].total_vendas || 0; 
        res.status(200).json({ total_vendas: totalVendas });
    } catch (err) {
        console.error('Erro ao calcular o total de vendas:', err);
        res.status(500).json({ error: 'Erro ao calcular o total de vendas.' });
    }
});

app.get('/api/vendas/contar-ids', verificarAutenticacao, async (req, res) => {
    try {
        
        const result = await query('SELECT codigo_vendas FROM projeto.vendas');
        
        
        let contador = 0;
        result.forEach((row) => {
            if (row.codigo_vendas !== null) {
                contador++;
            }
        });

        
        res.status(200).json({ total_ids: contador });
    } catch (err) {
        console.error('Erro ao contar os IDs da tabela vendas:', err);
        res.status(500).json({ error: 'Erro ao contar os IDs.' });
    }
});



app.get('/api/produtos/soma-quantidades', verificarAutenticacao, async (req, res) => {
    try {
        const result = await query('SELECT SUM(qtd_produtos) AS soma_quantidades FROM projeto.produtos');
        const somaQuantidades = result[0].soma_quantidades || 0; 
        res.status(200).json({ soma_quantidades: somaQuantidades });
    } catch (err) {
        console.error('Erro ao calcular a soma das quantidades de produtos:', err);
        res.status(500).json({ error: 'Erro ao calcular a soma das quantidades de produtos.' });
    }
});

// Rota para buscar detalhes de um produto pelo código
app.get('/api/produtos', verificarAutenticacao, async (req, res) => {
    const { code } = req.query; 

    try {
        let queryStr = 'SELECT * FROM produtos';
        let params = [];

        if (code) { 
            queryStr += ' WHERE codigo_produtos = ?';
            params.push(code);
        }

        const results = await query(queryStr, params);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para buscar detalhes de uma venda pelo código
app.get('/api/vendas', verificarAutenticacao, async (req, res) => {
    const { code } = req.query; 

    try {
        let queryStr = 'SELECT * FROM vendas';
        let params = [];

        if (code) { 
            queryStr += ' WHERE codigo_vendas = ?';
            params.push(code);
        }

        const results = await query(queryStr, params);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para buscar detalhes de um usuário pelo código
app.get('/api/usuarios', verificarAutenticacao, async (req, res) => {
    const { code } = req.query; 

    try {
        let queryStr = 'SELECT * FROM usuarios';
        let params = [];

        if (code) { 
            queryStr += ' WHERE codigo_usuarios = ?';
            params.push(code);
        }

        const results = await query(queryStr, params);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Rota para buscar todas as vendas
app.get('/api/vendas', async (req, res) => {
    try {
        const vendas = await query('SELECT * FROM vendas');
        res.json(vendas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//rota para buscar as informações da tabela usuarios
app.get('/api/usuarios', verificarAutenticacao, async (req, res) => {
    try {
        const usuarios = await query('SELECT * FROM usuarios');
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para inserir usuários
app.post('/api/usuarios', verificarAutenticacao, async (req, res) => {
    const { usuario_usuarios, senha_usuarios, email_usuarios, cargo_usuarios, turno_usuarios, salario_usuarios } = req.body;

    try {
        // Inserir o novo usuário no banco de dados
        const results = await query(
            'INSERT INTO projeto.usuarios (usuario_usuarios, senha_usuarios, email_usuarios, cargo_usuarios, turno_usuarios, salario_usuarios) VALUES (?, ?, ?, ?, ?, ?)', 
            [usuario_usuarios, senha_usuarios, email_usuarios, cargo_usuarios, turno_usuarios, salario_usuarios]
        );

        // Retornar o ID do novo usuário
        res.status(201).json({ id_usuario: results.insertId });
    } catch (err) {
        console.error('Erro no MySQL:', err);
        res.status(500).json({ error: 'Erro ao inserir usuário. Verifique os dados enviados.' });
    }
});

// Rota para atualizar usuários
app.put('/api/usuarios/:codigo_usuarios', verificarAutenticacao, async (req, res) => {
    const { codigo_usuarios } = req.params;
    const { usuario_usuarios, senha_usuarios, email_usuarios, cargo_usuarios, turno_usuarios, salario_usuarios } = req.body;

    try {
        // Atualizar os dados do usuário no banco de dados
        const results = await query(
            'UPDATE projeto.usuarios SET usuario_usuarios = ?, senha_usuarios = ?, email_usuarios = ?, cargo_usuarios = ?, turno_usuarios = ?, salario_usuarios = ? WHERE codigo_usuarios = ?', 
            [usuario_usuarios, senha_usuarios, email_usuarios, cargo_usuarios, turno_usuarios, salario_usuarios, codigo_usuarios]
        );

        // Verificar se algum usuário foi atualizado
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (err) {
        console.error('Erro no MySQL:', err);
        res.status(500).json({ error: 'Erro ao atualizar usuário. Verifique os dados enviados.' });
    }
});
// Rota para deletar usuários
app.delete('/api/usuarios/:codigo_usuarios', verificarAutenticacao, async (req, res) => {
    const { codigo_usuarios } = req.params;

    try {
        // Deletar o usuário do banco de dados
        const results = await query('DELETE FROM projeto.usuarios WHERE codigo_usuarios = ?', [codigo_usuarios]);

        // Verificar se o usuário foi deletado
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        console.error('Erro no MySQL:', err);
        res.status(500).json({ error: 'Erro ao deletar usuário. Verifique os dados enviados.' });
    }
});

// Rota para cadastrar um novo usuário
app.post('/api/usuarios/inserir', verificarAutenticacao, async (req, res) => {
    const { email_usuarios, senha_usuarios } = req.body;

    
    if (!email_usuarios || !email_usuarios.includes('@')) {
        return res.status(400).json({ error: 'E-mail inválido.' });
    }

    if (!senha_usuarios || senha_usuarios.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    try {
        
        const results = await query(
            'INSERT INTO projeto.usuarios (email_usuarios, senha_usuarios) VALUES (?, ?)',
            [email_usuarios, senha_usuarios]
        );

        res.status(201).json({ id_usuario: results.insertId });
    } catch (err) {
        console.error('Erro no MySQL:', err);
        res.status(500).json({ error: 'Erro ao inserir usuário. Verifique os dados enviados.' });
    }
});





app.post('/api/logar', async (req, res) => {
    try {
        await Logar(req.body, res); 
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Rota para deslogar
app.post('/api/logout', async (req, res) => {
 try {
 await Deslogar(req.body, res); 
 } catch (err) {
 res.status(500).json({ error: 'Internal server error' });
 }
});

// Rota existente para listar dados 
app.get('/api/dados', verificarAutenticacao, async (req, res) => {
    try {
    const results = await query('SELECT * FROM clientes');
    res.json(results);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
   });




// Rota para servir a página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'paginacomeco.html'));
});

app.get('/usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'usuarios.html'));
});


// Rota para página inicial - Protegida, requer autenticação
app.get('/index', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pg1.html'));
});


// Inicia o servidor
app.listen(8080, () => { 
    console.log("Servidor iniciado na porta 8080: http://localhost:8080"); 
});