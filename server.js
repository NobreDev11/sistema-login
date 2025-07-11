// Importa os pacotes necessários
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Cria a aplicação Express
const app = express();

// Configura o Express para entender JSON
app.use(express.json());

// Ativa o CORS para permitir conexões externas (frontend)
app.use(cors());

// Configura as variáveis de ambiente
dotenv.config();

// Conecta ao banco de dados MongoDB
connectDB();

// Importa as rotas de usuário
const usuarioRoutes = require('./routes/usuarioRoutes');

// Ativa as rotas no caminho /api/usuarios
app.use('/api/usuarios', usuarioRoutes);

// Define a porta do servidor
const PORT = process.env.PORT || 5000;

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
