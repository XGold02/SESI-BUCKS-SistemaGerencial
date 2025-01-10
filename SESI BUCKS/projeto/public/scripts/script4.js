async function fetchTotalVendas() {
    try {
        const response = await fetch('/api/vendas/total');
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }

        const data = await response.json();
        const totalVendas = data.total_vendas;

        // Exibe o valor total de vendas na página
        document.getElementById('total-vendas').textContent = `R$ ${parseFloat(totalVendas).toFixed(2)}`;
    } catch (error) {
        console.error('Erro ao buscar o total de vendas:', error);
        document.getElementById('total-vendas').textContent = 'Erro ao carregar total de vendas';
    }
}

async function fetchUltimoCodigo() {
  try {
      const response = await fetch('/api/vendas/ultimo-codigo');
      if (!response.ok) {
          throw new Error('Erro na resposta da API');
      }

      const data = await response.json();
      const ultimoCodigo = data.ultimo_codigo;

      // Exibe o último código de vendas na página
      document.getElementById('ultimo-codigo').textContent = `${ultimoCodigo}`;
  } catch (error) {
      console.error('Erro ao buscar o último código de vendas:', error);
      document.getElementById('ultimo-codigo').textContent = 'Erro ao carregar o último código de vendas';
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

// Chama a função para carregar a soma das quantidades ao carregar a página
fetchSomaQuantidades();

// Chama a função para carregar a soma dos códigos ao carregar a página
fetchUltimoCodigo();


// Chama a função para carregar o total de vendas ao carregar a página
fetchTotalVendas();


async function fetchData() {
    const selection = document.getElementById('selection').value;
    const search = document.getElementById('code').value.trim();
    const resultContainer = document.querySelector('.rounded-box[data-result="true"]'); // Seleciona a div que contém a tabela

    // Define o endpoint com base na seleção
    const endpoint =
        selection === 'estoque' ? '/api/produtos' :
        selection === 'vendas' ? '/api/vendas' :
        selection === 'usuarios' ? '/api/usuarios' : '';

    if (!endpoint) return; // Se não houver endpoint válido, interrompe

    try {
        // Faz a requisição ao backend com o parâmetro de busca
        const response = await fetch(`${endpoint}?search=${encodeURIComponent(search)}`);
        const data = await response.json();

        // Filtra os dados para exibir apenas o item com o código ou nome pesquisado
        const filteredData = search ? data.filter(item =>
            (item.codigo_produtos?.toString() === search || item.nome_produtos?.toLowerCase().includes(search.toLowerCase())) ||
            (item.codigo_vendas?.toString() === search || item.nomecliente_vendas?.toLowerCase().includes(search.toLowerCase())) ||
            (item.codigo_usuarios?.toString() === search || item.usuario_usuarios?.toLowerCase().includes(search.toLowerCase()))
        ) : data;

        // Verifica se há resultados e exibe a tabela
        if (filteredData.length > 0) {
            renderTable(filteredData, selection);
            resultContainer.style.display = 'block'; // Mostra a tabela
        } else {
            alert("Nenhum resultado encontrado.");
            resultContainer.style.display = 'none'; // Esconde a tabela
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Erro ao buscar dados. Verifique o console para mais detalhes.");
        resultContainer.style.display = 'none'; // Esconde a tabela em caso de erro
    }
}


function renderTable(data, selection) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    // Limpa o conteúdo existente da tabela
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    // Define as colunas e seus títulos para cada tabela
    let columns, columnTitles;

    if (selection === 'estoque') {
        columns = ["codigo_produtos", "nome_produtos", "valor_produtos", "tipo_produtos", "qtd_produtos", "tamanho_produtos", "descrição_produtos"];
        columnTitles = ["Código", "Nome", "Valor", "Tipo", "Quantidade", "Tamanho", "Descrição"];
    } else if (selection === 'vendas') {
        columns = ["codigo_vendas", "nomecliente_vendas", "pagamento_vendas", "data_vendas", "mesa_vendas", "telefone_vendas", "valortotal_vendas"];
        columnTitles = ["Código", "Cliente", "Pagamento", "Data", "Mesa", "Telefone", "Valor Total"];
    } else if (selection === 'usuarios') {
        columns = ["codigo_usuarios", "usuario_usuarios", "senha_usuarios", "email_usuarios", "cargo_usuarios", "turno_usuarios", "salario_usuarios"];
        columnTitles = ["Código", "Usuário", "Senha", "Email", "Cargo", "Turno", "Salário"];
    }

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
            td.textContent = item[col] || ''; // Acessa propriedades dinamicamente
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });
}





  

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
