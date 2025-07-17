const jwt = require('jsonwebtoken');

// Simulando banco de dados em memória
const usuarios = [];

// Função para gerar token
function gerarToken(usuarioId) {
  return jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

// Registrar novo usuário
exports.registrarUsuario = (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarioExistente = usuarios.find((u) => u.email === email);

  if (usuarioExistente) {
    return res.status(400).json({ mensagem: 'Usuário já registrado.' });
  }

  const novoUsuario = { id: usuarios.length + 1, nome, email, senha };
  usuarios.push(novoUsuario);

  const token = gerarToken(novoUsuario.id);
  res.status(201).json({ usuario: novoUsuario, token });
};

// Login do usuário
exports.loginUsuario = (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
  }

  const token = gerarToken(usuario.id);
  res.status(200).json({ usuario, token });
};

// Dados do usuário logado
exports.dadosUsuario = (req, res) => {
  const usuario = usuarios.find((u) => u.id === req.usuario.id);

  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
  }

  res.status(200).json(usuario);
};
