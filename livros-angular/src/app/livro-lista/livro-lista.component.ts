import { Component, OnInit } from '@angular/core';
import { Editora } from '../editora';
import { Livro } from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  standalone: false,
  templateUrl: './livro-lista.component.html',
  styleUrl: './livro-lista.component.css'
})
export class LivroListaComponent implements OnInit {
  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];
  public erro: string = '';

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService
  ) { }

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
    this.servLivros.obterLivros()
      .then(livros => {
        this.livros = livros;
      })
      .catch((erro: unknown) => {
        this.erro = erro instanceof Error ? erro.message : 'Não foi possível carregar os livros';
      });
  }

  excluir = (codigo: string): void => {
    this.servLivros.excluir(codigo)
      .then(() => this.servLivros.obterLivros())
      .then(livros => {
        this.livros = livros;
        this.erro = '';
      })
      .catch((erro: unknown) => {
        this.erro = erro instanceof Error ? erro.message : 'Não foi possível excluir o livro';
      });
  }

  obterNome = (codEditora: number): string => {
    return this.servEditora.getNomeEditora(codEditora);
  }
}
