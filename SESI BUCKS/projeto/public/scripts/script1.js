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

// Chama a função para carregar a soma das quantidades ao carregar a página
fetchSomaQuantidades();

// Chama a função para carregar a soma dos códigos ao carregar a página
fetchTotalIdsIterativo()


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