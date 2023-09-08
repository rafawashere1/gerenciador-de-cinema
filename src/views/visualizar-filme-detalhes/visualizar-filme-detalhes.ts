import { CreditosFilme } from "../../models/creditos-filme";
import { DetalhesFilme } from "../../models/detalhes-filme";
import { TrailerFilme } from "../../models/trailer-filme";
import { FilmeService } from "../../services/filme.service";
import "./visualizar-filme-detalhes.css";

export class FilmeDetalhes {
  pnlPrincipal: HTMLDivElement;
  filmeService: FilmeService;
  idFilme: string;

  constructor() {
    this.pnlPrincipal = document.getElementById('pnlPrincipal') as HTMLDivElement;

    const urlAtual = new URL(window.location.href);
    this.idFilme = urlAtual.searchParams.get("id") as string;

    this.filmeService = new FilmeService();

    this.filmeService
      .selecionarDetalhesFilmePorId(this.idFilme)
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
    this.pnlPrincipal.innerHTML = '';
  
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
  
    const coracao = document.createElement('i');
    coracao.classList.add('bi', 'bi-heart', 'fs-2', 'text-warning');
  
    votos.appendChild(votosTexto);
    votos.appendChild(coracao);
  
    cabecalho.appendChild(titulo);
    cabecalho.appendChild(votos);
  
    const dataLancamento = document.createElement('small');
    dataLancamento.id = 'dataLancamento';
    dataLancamento.textContent = detalhesFilme.dataLancamento;
  
    const secaoPosterTrailer = document.createElement('div');
    secaoPosterTrailer.classList.add('row', 'gap-3');
  
    const colPoster = document.createElement('div');
    colPoster.classList.add('col-lg-3');
  
    const poster = document.createElement('img');
    poster.src = detalhesFilme.urlPoster;
    poster.classList.add('img-fluid', 'rounded-3');
  
    colPoster.appendChild(poster);
  
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
  
    const secaoGeneros = document.createElement('div');
    secaoGeneros.classList.add('d-flex', 'gap-3');
  
    detalhesFilme.generos.forEach((genero) => {
      const badge = document.createElement('span');
      badge.classList.add('badge', 'rounded-pill', 'fs-5', 'px-4', 'py-2', 'bg-warning', 'text-dark');
      badge.textContent = genero
      secaoGeneros.appendChild(badge);
    });
  
    const secaoDescricao = document.createElement('div');
    secaoDescricao.classList.add('row');
  
    const descricao = document.createElement('p');
    descricao.classList.add('fs-5', 'text-light');
    descricao.textContent = detalhesFilme.sinopse;
  
    secaoDescricao.appendChild(descricao);
  
    const secaoCreditos = document.createElement('div');
    secaoCreditos.classList.add('row', 'mt-4');
  
    const creditosTitulo = document.createElement('h2');
    creditosTitulo.classList.add('text-light');
    creditosTitulo.textContent = 'Créditos';
  
    secaoCreditos.appendChild(creditosTitulo);
  
    const creditosLista = document.createElement('ul');
    creditosLista.classList.add('list-group', 'list-group-flush');
  
    const creditoItem = document.createElement('li');
    creditoItem.classList.add('list-group-item', 'bg-dark', 'text-light');
  
    const nomeCredito = document.createElement('span');
    nomeCredito.textContent = creditosFilme.nome;
    nomeCredito.classList.add('fw-bold');
  
    const personagemCredito = document.createElement('span');
    personagemCredito.textContent = ` (${creditosFilme.personagem})`;
  
    creditoItem.appendChild(nomeCredito);
    creditoItem.appendChild(personagemCredito);
  
    creditosLista.appendChild(creditoItem);
  
    secaoCreditos.appendChild(creditosLista);
  
    this.pnlPrincipal.appendChild(cabecalho);
    this.pnlPrincipal.appendChild(dataLancamento);
    this.pnlPrincipal.appendChild(secaoPosterTrailer);
    this.pnlPrincipal.appendChild(secaoGeneros);
    this.pnlPrincipal.appendChild(secaoDescricao);
    this.pnlPrincipal.appendChild(secaoCreditos);
  }
  }

window.addEventListener('load', () => new FilmeDetalhes())