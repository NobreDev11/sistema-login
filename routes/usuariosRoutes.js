
const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/usuariosController');

router.post('/registrar', registrarUsuario);

module.exports = router;
