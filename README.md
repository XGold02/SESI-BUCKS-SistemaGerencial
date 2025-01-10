<!-- MODELO PROJETO FINALIZADO -->
<h1 align="center"> 
	  🚀✅ SESI BUCKS - Concluído ✅🚀
</h1>

<!-- ---------------------------------------------------------------------- -->

<!-- MODELO MENU DE NAVEGAÇÃO -->
<p align="center">
 <a href="#-Descrição-do-entregável">Descrição do Entregável</a> •
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autor">Autor</a> • 
 <a href="#user-content--licença">Licença</a>
</p>

<!-- ---------------------------------------------------------------------- -->

<!-- MODELO DE DESCRIÇÃO -->
## 📄 Descrição do entregável

<!-- EXEMPLO DE DESCRIÇÃO DE UM PROJETO: -->
- SESI BUCKS (Pasta que armazena todo o projeto)

- Projeto(Pasta que vai armazenar as principais informações, os HTMLS, Imagens, Arquivos Javascript etc...)
 
- Slides e DocRequisitos e Prototipo(Pasta que vai armazenar os slides que utilizamos para apresentar a banca, documento de requisitos e as imagens do Protótipo de baixa fidelidade)

- MySQL(Pasta que vai armazenar o arquivo do Banco de dados a ser executado e um codigo com informações pré inseridas para realizar testes)

---

<!-- ---------------------------------------------------------------------- -->

<!-- MODELO DESCRIÇÃO SOBRE O PROJETO: -->
## 💻 Sobre o projeto

<!-- EXPLICA O MOTIVO DO PROJETO -->
{SESI-BUCKS SISTEMA GERENCIAL} é um projeto criado para o SENAI, foi posto como TCC de nosso curso a ser apresentado a banca avaliadora.

O desafio proposto para este projeto era a criação de um Sistema Gerencial voltado para cafeterias que permitiria fazer o controle de estoque, controle de vendas e relatórios financeiros de forma simples e intuitiva. É pautado na ideia de facilitar o dia a dia dos proprietários.


<!-- LINHA DE DIVISÃO: -->
---

<!-- ---------------------------------------------------------------------- -->

<!-- MODELO FUNCIONALIDADES: -->
## ⚙️ Funcionalidades

<!-- EXEMPLO DE FUNCIONALIDADES: -->
- [x] Se o usuario inserir senha ou email errado na hora de login ele não poderá acessar o sistema.
- [x] Se o usuario digitar uma data fora do padrao de formatação do MySQL: YYYY-MM-DD HH:MM:SS, a venda não sera inserida no banco de dados e irá voltar uma mensagem de erro.
- [x] Qualquer erro de formatação, digitação, irá voltar uma mensagem de erro para que o usuario saiba oque aconteceu.
- [x] Quando o produto for inserido, deletado, atualizado também ira aparecer uma mensagem de confirmação na tela.
- [x] Após uma informação ser deletada ela não podera ser recuperada, apenas a inserindo novamente, o mesmo vale para atualizações.  
---

<!-- ---------------------------------------------------------------------- -->

<!-- EXEMPLO DE LAYOUT: -->
## 🎨 Layout

### Widget

<!-- AQUI VOCÊ PASSA O CAMINHO DA IMAGEM -->
![Mobile1](https://github.com/FabioVazzz/SESI-BUCKS-SistemaGerencial/blob/main/_assets/Tela%20inicial.png)<br>
![Mobile2](https://github.com/FabioVazzz/SESI-BUCKS-SistemaGerencial/blob/main/_assets/Tela%20Login.png)<br>
![Mobile3](https://github.com/FabioVazzz/SESI-BUCKS-SistemaGerencial/blob/main/_assets/Tela%20Cadastro.png)<br>
![Mobile2](https://github.com/FabioVazzz/SESI-BUCKS-SistemaGerencial/blob/main/_assets/Tela%20Sistema%20pg1.png)<br>
![Mobile2](https://github.com/FabioVazzz/SESI-BUCKS-SistemaGerencial/blob/main/_assets/Tela%20Sistema%20pg1%20modo%20dark.png)<br>
![Mobile2](https://github.com/FabioVazzz/SESI-BUCKS-SistemaGerencial/blob/main/_assets/Tela%20Vendas.png)<br>
![Mobile2](https://github.com/FabioVazzz/SESI-BUCKS-SistemaGerencial/blob/main/_assets/Tela%20Estoque.png)<br>
![Mobile2](https://github.com/FabioVazzz/SESI-BUCKS-SistemaGerencial/blob/main/_assets/Tela%20historico.png)<br>
![Mobile2](https://github.com/FabioVazzz/SESI-BUCKS-SistemaGerencial/blob/main/_assets/Tela%20pefil.png)<br>
![Mobile2](https://github.com/FabioVazzz/SESI-BUCKS-SistemaGerencial/blob/main/_assets/Tela%20perfil%20inserir.png)<br>



---

<!-- ---------------------------------------------------------------------- -->

<!-- MODELO DE COMO EXECUTAR O PROJETO -->
## 🚀 Como executar o projeto

TUTORIAL - CONEXÃO NODE.JS E MYSQL
1) Caso não possua o MySql server, Workbench e o Node JS instalados, realize a
instalação:
Baixe e instale o MySql installer.
Utilize obrigatoriamente a senha 123456
LINK:
https://dev.mysql.com/downloads/installer/
Baixe e instale o MySql Workbench
LINK:
https://dev.mysql.com/downloads/workbench/
Baixe e instale o Node JS
LINK:
https://nodejs.org/pt
2) Com os três itens instalados, realize as seguintes configurações em seu computador:
Pesquise em seu computador por ‘Editar variáveis de ambiente do sistema’. Acesse, clique
em “variáveis de ambiente” e clique duas vezes no item PATH. Clique em “novo” e insira o
caminho onde o Node JS foi instalado em seu sistema (provavelmente C:\Program
Files\nodejs).
Pesquise em seu computador por ‘Windows PowerShell’ e o execute como administrador.
Cole o comando abaixo, tecle ENTER, digite S e tecle ENTER novamente.
Set-ExecutionPolicy Unrestricted
Feche todas as telas abertas durante os itens 1 e 2.
3) Acesse o MySql Workbench, entre na conexão disponível com sua senha e execute o sql
para criar o schema e as tabelas de seu projeto. Utilize o nome do Schema como
“projeto”.
Após concluir a criação das tabelas, execute o código abaixo para criar a database:
create database projeto character set utf8mb4 collate utf8mb4_unicode_ci;
Mantenha o nome da database como “projeto”
4) Crie uma pasta na raiz do disco C com o nome "projeto".
5) Abra a pasta no VS Code (file --> open folder).
6) Abra uma guia do terminal no aplicativo (terminal --> new terminal).
7) Se o projeto estiver sendo criado pela primeira vez:
Rode os códigos abaixo no terminal do VS code (uma linha de cada vez):
npm init
npm install express
npm install -g nodemon
npm install --save-dev nodemon

<br>
***BAIXE TODOS OS ARQUIVOS QUE DISPONIBILIZEI, RODE OS COMANDOS ACIMA E PULE PARA O PASSO 16***
<br>
<br>

9) Crie um arquivo dentro do projeto chamado index.js (new file):
Entre no arquivo index.js e cole o código abaixo:
const express=require('express');
const app=express();
app.get("/", async (req, res) => {
 res.send("Página inicial");
});
app.listen(8080, () => {
 console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
10) No terminal do VS Code, teste a conexão:
nodemon index.js
Acesse no navegador http://localhost:8080
11) Instale o MySql no projeto rodando o código abaixo no terminal do VS Code:
npm install --save mysql2
12) Crie uma pasta chamada models e crie um arquivo db.js dentro dela
Cole o código abaixo no arquivo db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '123456',
 database: 'projeto'
});
connection.connect(err => {
 if (err) {
 console.error('Erro ao conectar ao MySQL:', err);
 return;
 }
 console.log('Conectado ao MySQL!');
});
module.exports = connection;
13) Altere seu index.js conforme arquivo disponibilizado.
14) Crie uma pasta ‘public’ dentro da pasta do projeto com um arquivo index.html,
style.css e script.js
Acesse os arquivos disponibilizados, copie e cole os códigos em seus respectivos
arquivos.
15) Teste todo o processo acessando o localhost:
http://localhost:8080
16) Se o projeto já estiver todo criado e você só quiser baixar e executar:
Faça download dos arquivos e salve dentro da pasta projeto.
Abra essa pasta no VS Code (file --> open folder)
Rode todos os códigos que rodou la em cima novamente e os abaixo no terminal do VS code (uma linha de cada vez):
npm install
nodemon index.js
npm install cookie-parser
<br>
BÔNUS
EXPORTANDO E IMPORTANDO O BANCO MYSQL COM TODAS AS INFORMAÇÕES SALVAS
Exportar
Abra o prompt de comando do Windows e execute o código abaixo:
mysqldump -u root -p projeto > projeto.sql
Importar
Rode o código abaixo dentro da conexão MySQL
create database projeto character set utf8mb4 collate utf8mb4_unicode_ci;
No prompt do Windows:
mysqldump -u root -p projeto < projeto.sql

<!-- ---------------------------------------------------------------------- -->

<!-- MODELO DE PRÉ REQUISITOS -->
### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

<!-- ---------------------------------------------------------------------- -->

<!-- MODELO DE TECNOLOGIAS -->
## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Front-End**  ([HTML5, CSS3, JAVASCRIPT]) 

#### **Back-End**  ([MySQL, Node.js, Express]) 
#### **Prototipação** ([Canva])

---

<!-- ---------------------------------------------------------------------- -->

<!-- MODELO DE COMO CONTRIBUIR PARA O PROJETO -->
## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

---

<!-- ---------------------------------------------------------------------- -->

<!-- MODELO DE AUTOR-->
## 🦸 Autor

<a href="https://www.linkedin.com/in/fabio-bernardi-vaz-b0a94b280/">
Fabio Bernardi Vaz</a>
 <br />
 
[![Gmail Badge](https://img.shields.io/badge/-fabaoti15@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:fabaoti15@gmail.com)](mailto:fabaoti15@gmail.com)

---

<!-- ---------------------------------------------------------------------- -->

Feito por Fabio Bernardi Vaz👋🏽 [Entre em contato!](https://www.linkedin.com/in/fabio-bernardi-vaz-b0a94b280/)

