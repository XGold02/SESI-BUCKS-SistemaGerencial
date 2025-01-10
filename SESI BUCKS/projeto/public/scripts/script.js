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
//funcao para buscar o ultimo codigo da tabela vendas e aparecer na tela
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
//funcao para fazer a soma das quantidades dos produtos e aparecer na tela
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

async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const vendaData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/vendas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vendaData)
        });

        if (!response.ok) {
            throw new Error('Erro ao inserir venda');
        }

        const data = await response.json();
        console.log('Venda inserida:', data);

        // Atualiza os dados na página após a inserção
        fetchVendasData();
        fetchTotalVendas();
        fetchTotalIdsIterativo();
        fetchSomaQuantidades();
    } catch (error) {
        console.error('Erro ao inserir venda:', error);
    }
}



// Função para exibir o formulário inicial de inserção
function restaurarFormularioInicial() {
    const form = document.getElementById('form-insert-venda');
    form.innerHTML = `
        <div class="input-group">
            <input type="text" name="nomecliente_vendas" placeholder="Nome do Cliente" required>
            <input type="text" name="pagamento_vendas" placeholder="Método de Pagamento" required>
        </div>
        <div class="input-group">
            <input type="text" name="data_vendas" placeholder="Data e Hora da Venda" required>
            <input type="number" name="mesa_vendas" placeholder="Número da Mesa" required>
        </div>
        <div class="input-group">
            <input type="text" name="telefone_vendas" placeholder="Telefone do Cliente">
            <input type="number" name="valortotal_vendas" placeholder="Valor Total" required>
        </div>
        <div class="button-group">
            <button type="submit" class="btn-insert">Inserir Venda</button>
            <button type="button" class="btn-update">Atualizar</button>
            <button type="button" class="btn-delete">Deletar</button>
            <button type="button" class="btn-cancel">Cancelar</button>
        </div>
    `;

    // Remove listeners antigos e adiciona um novo
    form.removeEventListener('submit', handleSubmit); 
    form.addEventListener('submit', handleSubmit);

    // Atualiza a tabela com os dados atuais
    fetchVendasData();
    // Restaura eventos dos botões
    adicionarEventosBotoes();
}


// Função para adicionar eventos aos botões
function adicionarEventosBotoes() {
    document.querySelector('.btn-update').addEventListener('click', function() {
        const form = document.getElementById('form-insert-venda');
        form.innerHTML = `
            <div class="input-single">
                <input type="number" name="codigo_vendas" placeholder="Código do Produto" required>
            </div>
            <div class="input-group">
                <input type="text" name="novo_nomecliente_vendas" placeholder="Novo Nome do Cliente" required>
                <input type="text" name="novo_pagamento_vendas" placeholder="Novo Método de Pagamento" required>
            </div>
            <div class="input-group">
                <input type="text" name="novo_data_vendas" placeholder="Nova Data e Hora da Venda" required>
                <input type="number" name="novo_mesa_vendas" placeholder="Novo Número da Mesa" required>
            </div>
            <div class="input-group">
                <input type="text" name="novo_telefone_vendas" placeholder="Novo Telefone do Cliente">
                <input type="number" name="novo_valortotal_vendas" placeholder="Novo Valor Total" required>
            </div>
            <div class="button-group">
                <button type="submit" class="btn-update">Confirmar Atualização</button>
                <button type="button" class="btn-cancel">Cancelar</button>
            </div>
            <div id="resultado-update"></div>
        `;
        form.addEventListener('submit', handleUpdate);
        document.querySelector('.btn-cancel').addEventListener('click', restaurarFormularioInicial);
    });

    document.querySelector('.btn-delete').addEventListener('click', function() {
        const form = document.getElementById('form-insert-venda');
        form.innerHTML = `
            <div class="input-single">
                <input type="number" name="codigo_vendas" placeholder="Código do Produto" required>
            </div>
            <div class="button-group">
                <button type="submit" class="btn-delete">Confirmar Exclusão</button>
                <button type="button" class="btn-cancel">Cancelar</button>
            </div>
            <div id="resultado-delete"></div>
        `;
        form.addEventListener('submit', handleDelete);
        document.querySelector('.btn-cancel').addEventListener('click', restaurarFormularioInicial);
    });

    document.querySelector('.btn-cancel').addEventListener('click', restaurarFormularioInicial);
}

// Evento de submissão do formulário para Inserir Vendas
document.getElementById('form-insert-venda').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nomecliente_vendas = this.nomecliente_vendas.value;
    const pagamento_vendas = this.pagamento_vendas.value;
    const now = new Date();
    const data_vendas = now.toISOString().slice(0, 19).replace('T', ' ');
    const mesa_vendas = parseInt(this.mesa_vendas.value);
    const telefone_vendas = this.telefone_vendas.value;
    const valortotal_vendas = parseFloat(this.valortotal_vendas.value);

    try {
        const response = await fetch('/api/vendas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nomecliente_vendas, 
                pagamento_vendas, 
                data_vendas, 
                mesa_vendas, 
                telefone_vendas, 
                valortotal_vendas 
            })
        });
        const data = await response.json();
        document.getElementById('resultado-da-venda').innerText = 'Venda inserida: ' + JSON.stringify(data);
    } catch (error) {
        console.error('Erro:', error);
    }
    fetchVendasData();
});

async function handleUpdate(event) {
    event.preventDefault();
    const codigo_vendas = document.querySelector('[name="codigo_vendas"]').value;
    const novo_nomecliente_vendas = document.querySelector('[name="novo_nomecliente_vendas"]').value;
    const novo_pagamento_vendas = document.querySelector('[name="novo_pagamento_vendas"]').value;
    const novo_data_vendas = document.querySelector('[name="novo_data_vendas"]').value;
    const novo_mesa_vendas = parseInt(document.querySelector('[name="novo_mesa_vendas"]').value);
    const novo_telefone_vendas = document.querySelector('[name="novo_telefone_vendas"]').value;
    const novo_valortotal_vendas = parseFloat(document.querySelector('[name="novo_valortotal_vendas"]').value);

    try {
        const response = await fetch(`/api/vendas/${codigo_vendas}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nomecliente_vendas: novo_nomecliente_vendas,
                pagamento_vendas: novo_pagamento_vendas,
                data_vendas: novo_data_vendas,
                mesa_vendas: novo_mesa_vendas,
                telefone_vendas: novo_telefone_vendas,
                valortotal_vendas: novo_valortotal_vendas
            })
        });
        const data = await response.json();
        document.getElementById('resultado-update').innerText = 'Produto atualizado: ' + JSON.stringify(data);

        if (!response.ok) throw new Error('Erro ao atualizar venda');
        fetchVendasData();
    } catch (error) {
        console.error('Erro ao atualizar venda:', error);
    }
}

async function handleDelete(event) {
    event.preventDefault();
    const codigo_vendas = document.querySelector('[name="codigo_vendas"]').value;

    try {
        const response = await fetch(`/api/vendas/${codigo_vendas}`, { method: 'DELETE' });
        const data = await response.json();
        document.getElementById('resultado-delete').innerText = 'Produto atualizado: ' + JSON.stringify(data);
        if (!response.ok) throw new Error('Erro ao deletar venda');
        fetchVendasData();
    } catch (error) {
        console.error('Erro ao deletar venda:', error);
    }
}

// Inicializa os eventos dos botões
adicionarEventosBotoes();

// Função para buscar e renderizar os dados das vendas na tabela
async function fetchVendasData() {
    try {
        const response = await fetch('/api/vendas');
        const vendas = await response.json();
        
        // Renderiza a tabela com os dados simplificados
        renderTable(vendas);
        document.getElementById('vendas-table').style.display = 'table';
    } catch (error) {
        console.error('Erro ao buscar dados das vendas:', error);
    }
}

// Função para formatar a data e hora
function formatDateTime(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('pt-BR'); // Formato: DD/MM/YYYY
    const formattedTime = date.toLocaleTimeString('pt-BR'); // Formato: HH:mm:ss
    return `${formattedDate}, ${formattedTime}`;
}

// Função para renderizar a tabela com cabeçalhos simplificados
function renderTable(vendas) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    tableHeader.innerHTML = `
        <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Pagamento</th>
            <th>Data</th>
            <th>Mesa</th>
            <th>Telefone</th>
            <th>Valor Total</th>
        </tr>
    `;

    tableBody.innerHTML = vendas.map(venda => `
        <tr>
            <td>${venda.codigo_vendas}</td>
            <td>${venda.nomecliente_vendas}</td>
            <td>${venda.pagamento_vendas}</td>
            <td>${formatDateTime(venda.data_vendas)}</td>
            <td>${venda.mesa_vendas}</td>
            <td>${venda.telefone_vendas}</td>
            <td>${venda.valortotal_vendas}</td>
        </tr>
    `).join('');
}





// Chama a função para carregar a tabela ao carregar a página
fetchVendasData();


// Chama a função para carregar a soma das quantidades ao carregar a página
fetchSomaQuantidades();

// Chama a função para carregar a soma dos códigos ao carregar a página
fetchTotalIdsIterativo();


// Chama a função para carregar o total de vendas ao carregar a página
fetchTotalVendas();

const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');


const activePage = sessionStorage.getItem('activePage');


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


allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        });
        li.classList.add('active');

        
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
