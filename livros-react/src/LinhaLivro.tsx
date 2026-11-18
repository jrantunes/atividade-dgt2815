import type { Livro } from './model/Livro';

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: string) => void;
}

export const LinhaLivro = ({ livro, excluir }: LinhaLivroProps) => {
  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{livro.codEditora}</td>
      <td>{livro.autores.join(', ')}</td>
      <td>
        <button onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
    </tr>
  );
};
