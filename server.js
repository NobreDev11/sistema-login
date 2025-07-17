const express = require('express');
const dotenv = require('dotenv');
const usuariosRoutes = require('./routes/usuariosRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Rotas
app.use('/api/usuarios', usuariosRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
