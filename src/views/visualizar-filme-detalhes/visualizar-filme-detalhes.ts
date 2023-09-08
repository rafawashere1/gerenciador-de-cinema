import { CreditosFilme } from "../../models/creditos-filme";
import { DetalhesFilme } from "../../models/detalhes-filme";
import { TrailerFilme } from "../../models/trailer-filme";
import { RepositorioFilme } from "../../services/filme-repositorio";
import { FilmeService } from "../../services/filme.service";
import "./visualizar-filme-detalhes.css";

export class FilmeDetalhes {
  pnlPrincipal: HTMLDivElement;
  filmeService: FilmeService;
  idFilme: string;
  repositorioFilme: RepositorioFilme;

  constructor() {
    this.pnlPrincipal = document.getElementById('pnlPrincipal') as HTMLDivElement;

    const urlAtual = new URL(window.location.href);
    this.idFilme = urlAtual.searchParams.get("id") as string;

    this.filmeService = new FilmeService();
    this.repositorioFilme = new RepositorioFilme();

    this.filmeService
      .selecionarFilmePorId(this.idFilme)
      .then((detalhesFilme) => {
        this.filmeService
          .selecionarCreditosPorId(this.idFilme)
          .then((creditosFilme) => {
            this.filmeService
            .selecionarTrailersPorId(this.idFilme)
            .then((trailerFilme) => {
              this.exibirFilme(detalhesFilme, creditosFilme, trailerFilme)
            })
          });
      });
  }

  private exibirFilme(detalhesFilme: DetalhesFilme, creditosFilme: CreditosFilme, trailerFilme: TrailerFilme): void {
    const { cabecalho, dataLancamento } = this.obterCabecalho(detalhesFilme);
    const { colPoster, poster, secaoPosterTrailer } = this.obterPosters(detalhesFilme);
    colPoster.appendChild(poster);
    this.obterTrailer(trailerFilme, secaoPosterTrailer, colPoster);
    const secaoGeneros = this.obterGeneros(detalhesFilme);
    const secaoDescricao = this.obterDescricao(detalhesFilme);
    const secaoCreditos = this.obterCreditos(creditosFilme);

    [cabecalho, dataLancamento, secaoPosterTrailer, secaoGeneros, secaoDescricao, secaoCreditos]
      .forEach(section => this.pnlPrincipal.appendChild(section));
}

  private obterCabecalho(detalhesFilme: DetalhesFilme) {
    const cabecalho = document.createElement('div');
    cabecalho.classList.add('row', 'align-items-center');

    const titulo = document.createElement('h1');
    titulo.classList.add('text-light');
    titulo.textContent = detalhesFilme.titulo;

    const votos = document.createElement('div');
    votos.classList.add('ms-auto', 'text-end');

    const votosTexto = document.createElement('p');
    votosTexto.classList.add('text-light');
    votosTexto.textContent = `${detalhesFilme.contagemVotos} Votos`;

    const btnFavoritar = document.createElement("button");
    btnFavoritar.className = "btn btn-warning";

    const icon = document.createElement("i");
    if (this.filmeService.favoritos.favoritosIds.includes(this.idFilme)) {
      icon.className = "bi bi-heart-fill";
    } else {
      icon.className = "bi bi-heart";
    }

    icon.style.fontSize = "2rem";

    btnFavoritar.appendChild(icon);

    btnFavoritar.addEventListener('click', () => this.atualizarFavoritos(btnFavoritar));

    votos.appendChild(votosTexto);
    votos.appendChild(btnFavoritar);

    cabecalho.appendChild(titulo);
    cabecalho.appendChild(votos);

    const dataLancamento = document.createElement('small');
    dataLancamento.id = 'dataLancamento';
    dataLancamento.textContent = detalhesFilme.dataLancamento;
    return { cabecalho, dataLancamento };
  }

  private obterPosters(detalhesFilme: DetalhesFilme) {
    const secaoPosterTrailer = document.createElement('div');
    secaoPosterTrailer.classList.add('row', 'gap-3');

    const colPoster = document.createElement('div');
    colPoster.classList.add('col-lg-3');

    const poster = document.createElement('img');
    poster.src = detalhesFilme.urlPoster;
    poster.classList.add('img-fluid', 'rounded-3');
    return { colPoster, poster, secaoPosterTrailer };
  }

  private obterDescricao(detalhesFilme: DetalhesFilme) {
    const secaoDescricao = document.createElement('div');
    secaoDescricao.classList.add('row');

    const descricao = document.createElement('p');
    descricao.classList.add('fs-5', 'text-light');
    descricao.textContent = detalhesFilme.sinopse;

    secaoDescricao.appendChild(descricao);
    return secaoDescricao;
  }

  private obterGeneros(detalhesFilme: DetalhesFilme) {
    const secaoGeneros = document.createElement('div');
    secaoGeneros.classList.add('d-flex', 'gap-3');

    detalhesFilme.generos.forEach((genero) => {
      const badge = document.createElement('span');
      badge.classList.add('badge', 'rounded-pill', 'fs-5', 'px-4', 'py-2', 'bg-warning', 'text-dark');
      badge.textContent = genero;
      secaoGeneros.appendChild(badge);
    });
    return secaoGeneros;
  }

  private obterTrailer(trailerFilme: TrailerFilme, secaoPosterTrailer: HTMLDivElement, colPoster: HTMLDivElement) {
    const colTrailer = document.createElement('div');
    colTrailer.classList.add('col-lg');

    const ratio = document.createElement('div');
    ratio.classList.add('ratio', 'ratio-21x9', 'h-100');

    const iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = trailerFilme.sourceUrl;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    ratio.appendChild(iframe);
    colTrailer.appendChild(ratio);

    secaoPosterTrailer.appendChild(colPoster);
    secaoPosterTrailer.appendChild(colTrailer);
  }

    private obterCreditos(creditosFilme: CreditosFilme) {
      const secaoCreditos = document.createElement('div');
      secaoCreditos.classList.add('row', 'mt-4');
  
      const creditosTitulo = document.createElement('h2');
      creditosTitulo.classList.add('text-light', 'mb-4');
      creditosTitulo.textContent = 'Créditos';
  
      secaoCreditos.appendChild(creditosTitulo);
  
      const card = document.createElement('div');
      card.classList.add('card', 'bg-dark', 'text-light');
      card.style.maxWidth = '18rem';
      card.style.transition = 'transform 0.2s';
  
      const imagemAtor = document.createElement('img');
      imagemAtor.classList.add('card-img-top');
      imagemAtor.src = creditosFilme.caminho_imagem;
      imagemAtor.style.height = '400px';
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      const nomeCredito = document.createElement('h5');
      nomeCredito.classList.add('card-title', 'fw-bold');
      nomeCredito.textContent = creditosFilme.nome;
  
      const personagemCredito = document.createElement('p');
      personagemCredito.classList.add('card-text');
      personagemCredito.textContent = `Personagem: ${creditosFilme.personagem}`;
  
      cardBody.appendChild(nomeCredito);
      cardBody.appendChild(personagemCredito);
  
      card.appendChild(imagemAtor);
      card.appendChild(cardBody);
  
      card.addEventListener('mouseover', () => {
          card.style.transform = 'scale(1.05)';
      });
  
      card.addEventListener('mouseout', () => {
          card.style.transform = 'scale(1)';
      });
  
      const coluna = document.createElement('div');
      coluna.classList.add('col-md-6');
  
      coluna.appendChild(card);
  
      secaoCreditos.appendChild(coluna);
      return secaoCreditos;
  }

    private atualizarFavoritos(btn: HTMLButtonElement) {
      if(btn.innerHTML.includes('bi-heart-fill')) {
          let posicaoNumero = this.filmeService.favoritos.favoritosIds.indexOf(this.idFilme);
          this.filmeService.favoritos.favoritosIds.splice(posicaoNumero);
          btn.innerHTML = '<i class="bi bi-heart"></i>';
          btn.style.fontSize = "2rem";
      }
      else {
          this.filmeService.favoritos.favoritosIds.push(this.idFilme);
          btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
          btn.style.fontSize = "2rem";
      }

      this.repositorioFilme.salvarFavoritos(this.filmeService.favoritos);
    }
  }

window.addEventListener('load', () => new FilmeDetalhes())