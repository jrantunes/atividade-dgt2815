import { Injectable } from '@angular/core';
import { Livro } from './livro';

const baseURL = 'http://localhost:3030/livros';

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  constructor() { }

  async obterLivros(): Promise<Livro[]> {
    const resposta = await fetch(baseURL);
    this.validarResposta(resposta, 'carregar livros');
    const dados: LivroMongo[] = await resposta.json();
    return dados.map(livro => new Livro(
      livro._id ?? '',
      livro.codEditora,
      livro.titulo,
      livro.resumo,
      livro.autores
    ));
  }

  async incluir(livro: Livro): Promise<void> {
    const dados: LivroMongo = {
      _id: null,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    };
    const resposta = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    this.validarResposta(resposta, 'incluir livro');
  }

  async excluir(codigo: string): Promise<void> {
    const resposta = await fetch(`${baseURL}/${encodeURIComponent(codigo)}`, {
      method: 'DELETE'
    });
    this.validarResposta(resposta, 'excluir livro');
  }

  private validarResposta(resposta: Response, operacao: string): void {
    if (!resposta.ok) {
      throw new Error(`Não foi possível ${operacao}: ${resposta.status}`);
    }
  }
}
