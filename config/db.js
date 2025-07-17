const mongoose = require('mongoose');

const conectarBanco = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado ao MongoDB com sucesso!');
  } catch (erro) {
    console.error('❌ Erro ao conectar ao MongoDB:', erro);
    process.exit(1); // encerra o processo
  }
};

module.exports = conectarBanco;
