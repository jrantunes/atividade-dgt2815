const express = require('express');
const cors = require('cors');
const livroDao = require('./modelo/livro-dao');
const livroRouter = require('./routes/livros')(livroDao);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/livros', livroRouter);
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || error.statusCode ||
    (error.name === 'ValidationError' || error.name === 'CastError' ? 400 : 500);
  if (status >= 500) {
    console.error(error);
  }
  res.status(status).json({
    erro: status >= 500 ? 'Erro interno do servidor' : error.message
  });
});

module.exports = app;
