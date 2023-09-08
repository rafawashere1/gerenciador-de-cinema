import "bootstrap";

import "./visualizar-filme-listagem.css";

import { FilmeService } from "../../services/filme.service";
import { ListagemFilme } from "../../models/listagem-filme";
import { DetalhesFilme } from "../../models/detalhes-filme";

export class FilmeListagem {
  filmeService: FilmeService;
  pnlPrincipal: HTMLDivElement;

  constructor() {
    this.pnlPrincipal = document.getElementById('pnlPrincipal') as HTMLDivElement;

    this.filmeService = new FilmeService();

    this.filmeService
      .selecionarFilmesPorPopularidade()
      .then(filmes => this.exibirFilmesPorPopularidade(filmes));

    this.filmeService
      .selecionarFilmesFavoritos(this.filmeService.favoritos.favoritosIds)
      .then(filmes => this.exibirFilmesFavoritos(filmes));
  }

  private exibirFilmesPorPopularidade(filmes: ListagemFilme[]): void {
    const lblTitulo = document.createElement("h2");
    lblTitulo.textContent = "Filmes Em Alta";
    lblTitulo.classList.add("fs-1", "text-warning");

    const linhaCards = document.createElement("div");
    linhaCards.classList.add("row", "g-3");

    linhaCards.appendChild(lblTitulo);

    for (let filme of filmes) {
      const coluna = document.createElement("div");

      coluna.classList.add(
        "app-coluna-poster",
        "col-6",
        "col-md-4",
        "col-lg-2"
      );

      coluna.classList.add("text-center");

      coluna.addEventListener("click", () => {
        window.location.href = filme.urlDetalhes;
      });

      const card = document.createElement("div");
      card.classList.add("d-grid", "gap-2");

      const imgFilme = document.createElement("img");
      imgFilme.classList.add("img-fluid", "rounded-3");
      imgFilme.src = filme.urlPoster;

      const lblTituloFilme = document.createElement("a");
      lblTituloFilme.classList.add(
        "fs-5",
        "link-warning",
        "text-decoration-none"
      );
      lblTituloFilme.textContent = filme.titulo;
      lblTituloFilme.href = filme.urlDetalhes;

      card.appendChild(imgFilme);
      card.appendChild(lblTituloFilme);
      coluna.appendChild(card);
      linhaCards.appendChild(coluna);
    }

    this.pnlPrincipal.appendChild(linhaCards);
  }

  private exibirFilmesFavoritos(filmesFavoritos: DetalhesFilme[]): void {
    if (filmesFavoritos.length === 0) {
      return;
    }

    const linhaCards = document.createElement("div");
    linhaCards.classList.add("row", "g-3");
    const tituloDiv = document.createElement("div");
    tituloDiv.style.marginTop = "100px";
    linhaCards.appendChild(tituloDiv);
    
    const lblTitulo = document.createElement("h2");
    lblTitulo.textContent = "Filmes Favoritos";
    lblTitulo.classList.add("fs-1", "text-warning");
    tituloDiv.appendChild(lblTitulo);

    for (const filme of filmesFavoritos) {
      const coluna = document.createElement("div");

      coluna.classList.add(
        "app-coluna-poster",
        "col-6",
        "col-md-4",
        "col-lg-2"
      );

      coluna.classList.add("text-center");

      coluna.addEventListener("click", () => {
        window.location.href = filme.urlDetalhes;
      });

      const card = document.createElement("div");
      card.classList.add("d-grid", "gap-2");

      const imgFilme = document.createElement("img");
      imgFilme.classList.add("img-fluid", "rounded-3");
      imgFilme.src = filme.urlPoster;

      const lblTituloFilme = document.createElement("a");
      lblTituloFilme.classList.add(
        "fs-5",
        "link-warning",
        "text-decoration-none"
      );
      lblTituloFilme.textContent = filme.titulo;
      lblTituloFilme.href = filme.urlDetalhes;

      card.appendChild(imgFilme);
      card.appendChild(lblTituloFilme);
      coluna.appendChild(card);
      linhaCards.appendChild(coluna);
    }

    this.pnlPrincipal.appendChild(linhaCards);
  }
}

window.addEventListener('load', () => new FilmeListagem())