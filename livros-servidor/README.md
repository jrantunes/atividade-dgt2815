# livros-servidor

Servidor Express com persistência no MongoDB. O endereço padrão do banco é `mongodb://127.0.0.1:27017/livraria`; configure `MONGODB_URI` para usar outra instância.

Com o MongoDB em execução, instale as dependências e inicie a API:

```sh
npm install
npm start
```

A API fica disponível em `http://localhost:3030/livros` e permite listar livros (`GET`), incluir livros (`POST`) e excluir pelo identificador do MongoDB (`DELETE /:codigo`).
