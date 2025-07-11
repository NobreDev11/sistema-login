// Importa o Mongoose para conectar ao MongoDB
const mongoose = require('mongoose');

// Função assíncrona que conecta ao MongoDB usando a URI do .env
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado com sucesso');
    } catch (erro) {
        console.error('Erro ao conectar ao MongoDB:', erro.message);
        process.exit(1); // Encerra o servidor se a conexão falhar
    }
};

// Exporta a função para ser usada no server.js
module.exports = connectDB;
