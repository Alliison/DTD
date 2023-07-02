document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
  
    //cadastroForm.addEventListener('submit', function(event) {
      //event.preventDefault(); 
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha1 = document.getElementById('senha1').value;
      const senha2 = document.getElementById('senha2').value;

    // Verifica se as senhas são iguais
    if (senha1 !== senha2) {
    alert('As senhas não coincidem. Por favor, tente novamente.');
    return;
    }

    // Verifica se o email é válido
    if (!isValidEmail(email)) {
    alert('Por favor, insira um email válido.');
    return;
    }

    // Consulta no banco de dados se o email já está cadastrado
    if (isEmailRegistered(email)) {
    alert('O email fornecido já está cadastrado. Por favor, use outro email.');
    return;
    }

    // Salva o novo usuário no banco de dados
    saveUser(nome, email, senha1);

    // Limpa os campos do formulário
    cadastroForm.reset();

    alert('Cadastro realizado com sucesso!');
    });
  
    function isValidEmail(email) {
        function verificarEmail(email) {
            // Expressão regular para validar o formato do email
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
            // Verifica se o email corresponde ao formato esperado
            if (regex.test(email)) {
              return true; // Email válido
            } else {
              return false; // Email inválido
            }
          }          
    }
  
    function isEmailRegistered(email) {
      // Implemente a lógica para consultar no banco de dados se o email já está cadastrado
      // Retorne true se estiver cadastrado, caso contrário, retorne false
    }
  
    function saveUser(nome, email, senha) {
      // Importe os módulos necessários
    const express = require('express');
    const mysql = require('mysql');

    // Crie uma instância do aplicativo Express
    const app = express();

    // Configure as informações de conexão com o banco de dados
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Alison2004',
    database: 'usuario'
    });

    // Estabeleça a conexão com o banco de dados
    connection.connect((error) => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    } else {
        console.log('Conexão estabelecida com o banco de dados');
    }
    });

    // Rota para salvar um novo usuário no banco de dados
    app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifique se os campos necessários estão preenchidos
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos' });
    }

    // Crie a query para inserir o novo usuário no banco de dados
    const query = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
    const values = [nome, email, senha];

    // Execute a query
    connection.query(query, values, (error, results) => {
        if (error) {
        console.error('Erro ao salvar o usuário:', error);
        return res.status(500).json({ error: 'Erro ao salvar o usuário' });
        }

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    });
    });

    // Inicie o servidor
    app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
    });
}
