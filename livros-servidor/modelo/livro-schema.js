const { banco } = require('./conexao');

const LivroSchema = new banco.Schema({
  codEditora: {
    type: Number,
    required: true
  },
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  resumo: {
    type: String,
    default: ''
  },
  autores: {
    type: [String],
    default: []
  }
});

module.exports = banco.model('Livro', LivroSchema, 'livros');
