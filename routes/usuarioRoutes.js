const bcrypt = require('bcryptjs'); // Importa o bcrypt para criptografar e comparar senhas

// Importa o Express
const express = require('express');

// Cria um roteador
const router = express.Router();

// Importa o modelo 'Usuario' que criamos para acessar o banco de dados
const Usuario = require('../models/Usuario');

// Rota de teste
router.get('/teste', (req, res) => {
    res.send('Rota de teste funcionando!');
});

// Rota de cadastro
router.post('/cadastrar', async (req, res) => { // Cria a rota POST '/cadastrar' para registrar novos usuários
    const { nome, email, senha } = req.body; // Captura os dados enviados pelo frontend no corpo da requisição

    const usuarioExistente = await Usuario.findOne({ email }); // Verifica se já existe um usuário cadastrado com este e-mail

    if (usuarioExistente) { // Se o e-mail já estiver cadastrado, bloqueia o cadastro
        return res.status(400).json({ mensagem: 'E-mail já cadastrado.' }); // Retorna erro 400 e avisa que o e-mail já existe
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10); // Criptografa a senha informada antes de salvar

    const novoUsuario = new Usuario({ nome, email, senha: senhaCriptografada }); // Cria um novo usuário com os dados recebidos

    await novoUsuario.save(); // Salva o novo usuário no banco de dados

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!'}); // Retorna sucesso ao frontend
});

// Rota de Login
router. post('/login', async (req, res) => { // Cria a rota POST '/login' para autenticar usuários
    const { email, senha } = req.body; // Captura o e-mail e a senha enviados pelo frontend

    const usuario = await Usuario.findOne({ email }); // Procura no banco um usuário com o e-mail informado

    if (!usuario) { // Se o e-mail não existir no banco, boqueia o login
        return res.status(400).json({ mensagem: 'Usuário não encontrado.'}); // Responde com erro 400 informando que o usuário não foi encontrado

    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha); // Compara a senha digitada com a senha criptografada no banco

    if(!senhaCorreta) { // Se a senha for inválida, boqueia o login
        return res.status(400).json({ mensagem: 'Senha incorreta.'}); // Retorna erro 400 se a senha estiver errada
    }

    return res.status(200).json({ mensagem: 'Login realizado com sucesso!'}); // Retorna sucesso ao frontend quando o login estiver correto
});

// Exporta o roteador
module.exports = router;
