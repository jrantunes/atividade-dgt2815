const express = require('express');

function criarRoteador(livroDao) {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      res.json(await livroDao.obterLivros());
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({ erro: 'O corpo deve conter um livro em JSON' });
    }

    const { codEditora, titulo, resumo, autores } = req.body;
    try {
      const livro = await livroDao.incluir({ codEditora, titulo, resumo, autores });
      res.status(201).json({ mensagem: 'Livro incluído com sucesso', livro });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:codigo', async (req, res, next) => {
    try {
      const resultado = await livroDao.excluir(req.params.codigo);
      if (resultado.deletedCount === 0) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }
      res.json({ mensagem: 'Livro excluído com sucesso' });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = criarRoteador;
