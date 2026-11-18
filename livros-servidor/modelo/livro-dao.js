const Livro = require('./livro-schema');

const obterLivros = () => Livro.find().exec();
const incluir = (livro) => Livro.create(livro);
const excluir = (codigo) => Livro.deleteOne({ _id: codigo }).exec();

module.exports = { obterLivros, incluir, excluir };
