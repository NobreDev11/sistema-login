const mongoose = require('mongoose'); // Importa o Mongoose para criar e manipular os dados no MongoDB

const UsuarioSchema = new mongoose.Schema({ // Cria uma estrutura (chamada schema) para organizar os dados dos usuários
  nome: { // Cria o campo 'nome' que vai armazenar o nome do usuário
    type: String, // Define que o valor armazenado no campo 'nome' será um texto
    required: true // Este campo é obrigatório. O sistema não aceitará cadastro sem nome
  },
  email: { // Cria o campo 'email' que vai armazenar o e-mail do usuário
    type: String, // Define que o valor armazenado no campo 'email' será um texto
    required: true, // Este campo é obrigatório. O sistema não aceitará cadastro sem e-mail
    unique: true // Garante que não pode haver dois usuários com o mesmo e-mail
  },
  senha: { // Cria o campo 'senha' que vai armazenar a senha do usuário
    type: String, // Define que o valor armazenado no campo 'senha' será um texto
    required: true // Este campo é obrigatório. O sistema não aceitará cadastro sem senha
  }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema); // Cria o modelo 'Usuario' com base na estrutura (schema) que definimos

module.exports = Usuario; // Exporta o modelo 'Usuario' para ser usado em outros arquivos
