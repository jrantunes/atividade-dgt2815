import { useState, useEffect } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { LinhaLivro } from './LinhaLivro';
import type { Livro } from './model/Livro';

const controleLivros = new ControleLivros();

export const LivroLista = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    controleLivros.obterLivros().then(livros => {
      setLivros(livros);
      setCarregado(true);
    });
  }, [carregado]);

  const excluir = (codigo: string) => {
    controleLivros.excluir(codigo).then(() => setCarregado(false));
  };

  return (
    <main className="container">
      <h1>Lista de Livros</h1>
      <table className="tabela">
        <thead>
          <tr>
            <th>Título</th>
            <th>Resumo</th>
            <th>Editora</th>
            <th>Autores</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro, index) => (
            <LinhaLivro key={index} livro={livro} excluir={excluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
};
