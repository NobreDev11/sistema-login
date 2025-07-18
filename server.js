const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarBanco = require('./config/db');

const allowedOrigins = [
  'https://frontend-login-8dlb.onrender.com',
];

dotenv.config();
conectarBanco();

const app = express();

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

app.use(express.json());

// rotas
app.use('/api/usuarios', require('./routes/usuariosRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
