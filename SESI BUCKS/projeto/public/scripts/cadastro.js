document.getElementById('insertProfileForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('usuario_email').value;
    const senha = document.getElementById('usuario_senha').value;

    try {
        const response = await fetch('/api/usuarios/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_usuarios: email,
                senha_usuarios: senha
            })
        });

        if (response.ok) {
            // Redirecionar para a página de login
            window.location.href = '/usuarios';
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Erro ao cadastrar.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar-se ao servidor.');
    }
});
