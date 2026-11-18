const banco = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/livraria';
const conexao = banco.connect(uri);

module.exports = { banco, conexao };
