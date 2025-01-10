async function fetchTotalVendas() {
    try {
        const response = await fetch('/api/vendas/total');
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }

        const data = await response.json();
        const totalVendas = parseFloat(data.total_vendas);

        // Formata o valor no padrão brasileiro (R$ 122.249,00)
        const totalVendasFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(totalVendas);

        // Exibe o valor total de vendas formatado na página
        document.getElementById('total-vendas').textContent = totalVendasFormatado;
    } catch (error) {
        console.error('Erro ao buscar o total de vendas:', error);
        document.getElementById('total-vendas').textContent = 'Erro ao carregar total de vendas';
    }
}

async function fetchTotalIdsIterativo() {
    try {
        const response = await fetch('/api/vendas/contar-ids');
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }

        const data = await response.json();
        const totalIds = data.total_ids;

        // Exibe o total de IDs na página
        document.getElementById('ultimo-codigo').textContent = `${totalIds}`;
    } catch (error) {
        console.error('Erro ao buscar o total de IDs:', error);
        document.getElementById('ultimo-codigo').textContent = 'Erro ao carregar o total de vendas';
    }
}

async function fetchSomaQuantidades() {
    try {
        const response = await fetch('/api/produtos/soma-quantidades');
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }

        const data = await response.json();
        const somaQuantidades = data.soma_quantidades;

        // Exibe o valor da soma das quantidades de produtos na página
        document.getElementById('soma-quantidades').textContent = `${somaQuantidades}`;
    } catch (error) {
        console.error('Erro ao buscar a soma das quantidades de produtos:', error);
        document.getElementById('soma-quantidades').textContent = 'Erro ao carregar soma das quantidades de produtos';
    }
}


const toggleTableUsuarios = document.getElementById('toggle-table');
const userCardsContainer = document.getElementById('user-cards-container');

// Alternar a visibilidade do container de cartões
toggleTableUsuarios.addEventListener('click', () => {
    if (userCardsContainer.style.display === 'none') {
        userCardsContainer.style.display = 'block';
        toggleTableUsuarios.textContent = 'Fechar';
        fetchUsuariosData(); // Buscar dados ao abrir o container
    } else {
        userCardsContainer.style.display = 'none';
        toggleTableUsuarios.textContent = 'Abrir e Fechar';
    }
});

// Função para buscar e renderizar dados dos usuários
async function fetchUsuariosData() {
    try {
        const response = await fetch('/api/usuarios');
        const data = await response.json();
        renderUsuariosCards(data);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// Função para renderizar cada usuário em uma caixa individual com pares de informações
function renderUsuariosCards(data) {
    userCardsContainer.innerHTML = ''; // Limpar conteúdo existente

    data.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        // Adicionar imagem do usuário
        const userImage = document.createElement('img');
        userImage.src = 'imgs/loginBoneco.png'; // Caminho correto para a imagem
        userImage.alt = 'Imagem do Usuário';
        userImage.classList.add('user-image');

        // Adicionar informações do usuário em pares
        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info');
        
        userInfo.innerHTML = `
            <div class="info-pair"><strong>Código:</strong> ${user.codigo_usuarios}</div>
            <div class="info-pair"><strong>Usuário:</strong> ${user.usuario_usuarios}</div>
            <div class="info-pair"><strong>Email:</strong> ${user.email_usuarios}</div>
            <div class="info-pair"><strong>Cargo:</strong> ${user.cargo_usuarios}</div>
            <div class="info-pair"><strong>Turno:</strong> ${user.turno_usuarios}</div>
            <div class="info-pair"><strong>Salário:</strong> ${user.salario_usuarios}</div>
        `;

        // Estrutura do cartão com imagem e informações
        userCard.appendChild(userImage);
        userCard.appendChild(userInfo);

        userCardsContainer.appendChild(userCard);
    });
}


// Função para alternar a exibição das opções de perfil e expandir a caixa
function togglePerfilOpcoes() {
    const perfilOpcoes = document.getElementById("perfilOpcoes");
    perfilOpcoes.style.display = perfilOpcoes.style.display === "none" ? "flex" : "none";
    const controlePerfil = document.getElementById("controlePerfil");
    controlePerfil.style.height = perfilOpcoes.style.display === "flex" ? "200px" : "auto";
}

// Função para abrir o modal
function openModal() {
    document.getElementById('updateProfileModal').style.display = 'flex';
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('updateProfileModal').style.display = 'none';
}

// Evento para fechar o modal quando o usuário clica fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('updateProfileModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Função para Atualizar Usuários
document.getElementById('updateProfileForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const codigo_usuarios = parseInt(this.codigo.value);
    const usuario_usuarios = this.usuario.value;
    const senha_usuarios = this.senha.value;
    const email_usuarios = this.email.value;
    const cargo_usuarios = this.cargo.value;
    const turno_usuarios = this.turno.value;
    const salario_usuarios = this.salario.value;

    try {
        const response = await fetch(`/api/usuarios/${codigo_usuarios}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario_usuarios,
                senha_usuarios,
                email_usuarios,
                cargo_usuarios,
                turno_usuarios,
                salario_usuarios
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Usuário atualizado com sucesso: ' + JSON.stringify(data));
            closeModal();
            fetchUsuariosData(); // Atualiza a tabela com os novos dados
        } else {
            alert('Erro ao atualizar usuário: ' + (data.message || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro na conexão com o servidor.');
    }
});

// Função para Inserir Perfil
document.getElementById('insertProfileForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const usuario_usuarios = this.usuario.value;
    const senha_usuarios = this.senha.value;
    const email_usuarios = this.email.value;
    const cargo_usuarios = this.cargo.value;
    const turno_usuarios = this.turno.value;
    const salario_usuarios = this.salario.value;

    try {
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario_usuarios,
                senha_usuarios,
                email_usuarios,
                cargo_usuarios,
                turno_usuarios,
                salario_usuarios
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Perfil inserido com sucesso: ' + JSON.stringify(data));
            closeModal();
            fetchUsuariosData(); // Atualiza a tabela com o novo perfil
        } else {
            alert('Erro ao inserir perfil: ' + (data.message || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro na conexão com o servidor.');
    }
});

// Função para Deletar Perfil
document.getElementById('deleteProfileForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const codigo_usuarios = parseInt(this.codigo.value);

    try {
        const response = await fetch(`/api/usuarios/${codigo_usuarios}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        if (response.ok) {
            alert('Perfil deletado com sucesso: ' + JSON.stringify(data));
            closeModal();
            fetchUsuariosData(); // Atualiza a tabela removendo o perfil deletado
        } else {
            alert('Erro ao deletar perfil: ' + (data.message || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro na conexão com o servidor.');
    }
});



// Chama a função para carregar a soma das quantidades ao carregar a página
fetchSomaQuantidades();

// Chama a função para carregar a soma dos códigos ao carregar a página
fetchTotalIdsIterativo() 


// Chama a função para carregar o total de vendas ao carregar a página
fetchTotalVendas();

const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

// Check sessionStorage for the active page on load
const activePage = sessionStorage.getItem('activePage');

// Apply the active class to the saved page
if (activePage) {
    allSideMenu.forEach(item => {
        const li = item.parentElement;
        if (item.getAttribute('href') === activePage) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });
}

// Add event listener to each menu item
allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        });
        li.classList.add('active');

        // Save the active page to sessionStorage
        sessionStorage.setItem('activePage', item.getAttribute('href'));
    });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const switchMode = document.getElementById('switch-mode');

// Verifica o estado do modo escuro salvo no localStorage ao carregar a página
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    switchMode.checked = true;
}

// Adiciona um evento para alternar o modo escuro e salvar o estado no localStorage
switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'true'); // Salva o estado no localStorage
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'false'); // Salva o estado no localStorage
    }
});



const controlePerfils = document.getElementById('controlePerfil');
const perfilOpcoess = document.getElementById('perfilOpcoes');
const perfilContainer = document.querySelector('.perfil-container');
const updateProfileModal = document.getElementById('updateProfileModal');
const insertProfileModal = document.getElementById('insertProfileModal');
const deleteProfileModal = document.getElementById('deleteProfileModal');


controlePerfils.addEventListener('click', () => {
    if (perfilOpcoess.style.display === 'none' || perfilOpcoess.style.display === '') {
        perfilOpcoess.style.display = 'flex'; 
        perfilContainer.classList.add('expanded'); 
    } else {
        perfilOpcoess.style.display = 'none'; 
        perfilContainer.classList.remove('expanded'); 
    }
});


function openModal(modal) {
    modal.style.display = 'flex';
}

function closeModal() {
    updateProfileModal.style.display = 'none';
    insertProfileModal.style.display = 'none';
    deleteProfileModal.style.display = 'none';
}


document.getElementById('modificarPerfilButton').addEventListener('click', (event) => {
    event.stopPropagation();
    openModal(updateProfileModal);
});


document.getElementById('adicionarPerfil').addEventListener('click', (event) => {
    event.stopPropagation();
    openModal(insertProfileModal);
});


document.getElementById('excluirPerfil').addEventListener('click', (event) => {
    event.stopPropagation();
    openModal(deleteProfileModal);
});


window.onclick = function(event) {
    if (event.target === updateProfileModal || event.target === insertProfileModal || event.target === deleteProfileModal) {
        closeModal();
    }
};
