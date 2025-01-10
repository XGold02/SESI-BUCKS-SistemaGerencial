// Função para Inserir Produtos
document.getElementById('form-insert').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome_produtos = this.nome_produtos.value;
    const valor_produtos = parseFloat(this.valor_produtos.value);
    const tipo_produtos = this.tipo_produtos.value;
    const qtd_produtos = parseInt(this.qtd_produtos.value);
    const tamanho_produtos = this.tamanho_produtos.value;
    const descrição_produtos = this.descrição_produtos.value;

    try {
        const response = await fetch('/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                nome_produtos, 
                valor_produtos, 
                tipo_produtos, 
                qtd_produtos, 
                tamanho_produtos, 
                descrição_produtos 
            })
        });

        const data = await response.json();
        document.getElementById('resultado-insert').innerText = 'Produto inserido: ' + JSON.stringify(data);
    } catch (error) {
        console.error('Erro:', error);
    }
});


// Função para Atualizar Produtos
document.getElementById('form-update').addEventListener('submit', async function(event) {
    event.preventDefault();

    const codigo_produtos = parseInt(this.codigo_produtos.value);
    const nome_produtos = this.nome_produtos.value;
    const valor_produtos = parseFloat(this.valor_produtos.value);
    const tipo_produtos = this.tipo_produtos.value;
    const qtd_produtos = parseInt(this.qtd_produtos.value);
    const tamanho_produtos = this.tamanho_produtos.value;
    const descrição_produtos = this.descrição_produtos.value;

    try {
        const response = await fetch(`/api/produtos/${codigo_produtos}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                nome_produtos, 
                valor_produtos, 
                tipo_produtos, 
                qtd_produtos, 
                tamanho_produtos, 
                descrição_produtos 
            })
        });

        const data = await response.json();
        document.getElementById('resultado-update').innerText = 'Produto atualizado: ' + JSON.stringify(data);
    } catch (error) {
        console.error('Erro:', error);
    }
});


// Função para Deletar Produtos
document.getElementById('form-delete').addEventListener('submit', async function(event) {
    event.preventDefault();

    const codigo_produtos = parseInt(this.codigo_produtos.value);

    try {
        const response = await fetch(`/api/produtos/${codigo_produtos}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        document.getElementById('resultado-delete').innerText = 'Produto deletado: ' + JSON.stringify(data);
    } catch (error) {
        console.error('Erro:', error);
    }
});

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

// Seleciona os botões e elementos do DOM
const btnInsertProduto = document.getElementById('btn-insert-produto');
const btnUpdateProduto = document.getElementById('btn-update-produto');
const btnDeleteProduto = document.getElementById('btn-delete-produto');
const btnCancelar = document.getElementById('btn-cancelar');
const toggleTable = document.getElementById('toggle-table');
const formInsert = document.getElementById('form-insert');
const formUpdate = document.getElementById('form-update');
const formDelete = document.getElementById('form-delete');
const tableContainer = document.querySelector('.container1');

// Seleciona os títulos
const tituloInserir = document.getElementById('titulo-inserir');
const tituloAtualizar = document.getElementById('titulo-atualizar');
const tituloDeletar = document.getElementById('titulo-deletar');
const buttonOpenAndClose = document.getElementsByClassName('bx bx-lock-open-alt')

// Inicialmente, oculta os formulários e a tabela de produtos
formUpdate.style.display = 'none';
formDelete.style.display = 'none';
tableContainer.style.display = 'none'; // Inicia com a tabela oculta

// Função para alternar a visibilidade da tabela
function toggleTabela() {
    if (tableContainer.style.display === 'none') {
        tableContainer.style.display = 'block';
        toggleTable.textContent = 'Fechar Tabela';
    } else {
        tableContainer.style.display = 'none';
        toggleTable.textContent = 'Abrir Tabela';
    }
}

// Eventos para alterar entre formulários e títulos
btnInsertProduto.addEventListener('click', () => {
    formInsert.style.display = 'block';
    formUpdate.style.display = 'none';
    formDelete.style.display = 'none';

    tituloInserir.style.display = 'block';
    tituloAtualizar.style.display = 'none';
    tituloDeletar.style.display = 'none';
});

// Evento para alternar a visibilidade da tabela e buscar dados
toggleTable.addEventListener('click', () => {
    toggleTabela();
    if (tableContainer.style.display === 'block') {
        fetchData(); // Busca dados sempre que a tabela é aberta
    }
});

// Evento para Inserir Produto
btnInsertProduto.addEventListener('click', () => {
    formInsert.style.display = 'block';
    formUpdate.style.display = 'none';
    formDelete.style.display = 'none';
});

// Evento para Atualizar Produto
btnUpdateProduto.addEventListener('click', () => {
    formInsert.style.display = 'none';
    formUpdate.style.display = 'block';
    formDelete.style.display = 'none';
});

// Evento para Deletar Produto
btnDeleteProduto.addEventListener('click', () => {
    formInsert.style.display = 'none';
    formUpdate.style.display = 'none';
    formDelete.style.display = 'block';
});

// Evento para Cancelar Ação
btnCancelar.addEventListener('click', () => {
    formInsert.style.display = 'block';
    formUpdate.style.display = 'none';
    formDelete.style.display = 'none';
});

// Função para buscar dados e renderizar a tabela
async function fetchData() {
    const endpoint = '/api/produtos'; // Atualize conforme o endpoint necessário
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        renderTable(data, 'estoque');
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// Função para renderizar a tabela
function renderTable(data, selection) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    // Limpa o conteúdo existente da tabela
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    // Define as colunas e seus títulos
    let columns = ["codigo_produtos", "nome_produtos", "valor_produtos", "tipo_produtos", "qtd_produtos", "tamanho_produtos", "descrição_produtos"];
    let columnTitles = ["Código", "Nome", "Valor", "Produto", "Quantidade", "Tamanho", "Descrição"];

    // Renderiza o cabeçalho da tabela
    const headerRow = document.createElement('tr');
    columnTitles.forEach(title => {
        const th = document.createElement('th');
        th.textContent = title;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    // Renderiza o corpo da tabela
    data.forEach(item => {
        const row = document.createElement('tr');
        columns.forEach(col => {
            const td = document.createElement('td');
            td.textContent = item[col] || ''; // Exibe o valor ou vazio
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });
}

// Função para atualizar a tabela após cada operação
async function atualizarTabela() {
    await fetchData(); // Chama fetchData para atualizar os dados da tabela
}

// Eventos de submit para as operações CRUD
document.getElementById('form-insert').addEventListener('submit', async function(event) {
    event.preventDefault();
    await atualizarTabela();
});

document.getElementById('form-update').addEventListener('submit', async function(event) {
    event.preventDefault();
    await atualizarTabela();
});

document.getElementById('form-delete').addEventListener('submit', async function(event) {
    event.preventDefault();
    await atualizarTabela();
});


// Chama a função para carregar a soma das quantidades ao carregar a página
fetchSomaQuantidades();

// Chama a função para carregar a soma dos códigos ao carregar a página
fetchTotalIdsIterativo();

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


if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    switchMode.checked = true;
}


switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'true'); 
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'false'); 
    }
});

