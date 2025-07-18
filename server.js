const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarBanco = require('./config/db');

dotenv.config();
conectarBanco();

const app = express();

// 👉 Libera o frontend específico:
app.use(cors({
  origin: 'https://frontend-login-8dlb.onrender.com'
}));

app.use(express.json());
app.use('/api/usuarios', require('./routes/usuariosRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
