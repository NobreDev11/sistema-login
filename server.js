const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarBanco = require('./config/db');

dotenv.config();
conectarBanco();

const app = express();

// Lista de origens permitidas (frontend no Render)
const allowedOrigins = [
  'https://frontend-login-8dlb.onrender.com',
];

// Configura CORS com origem específica
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middleware para ler JSON
app.use(express.json());

// Rotas da API
app.use('/api/usuarios', require('./routes/usuariosRoutes'));

// Inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
