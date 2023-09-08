export class DetalhesFilme {
  id: string;
  titulo: string;
  sinopse: string;
  dataLancamento: string;

  urlPoster: string;
  urlSlide: string;

  mediaNota: number;
  contagemVotos: number;

  generos: string[];

  readonly urlDetalhes: string;

  constructor(id: string, titulo: string, sinopse: string, dataLancamento: string, urlPoster: string,  urlSlide: string, mediaNota: number, contagemVotos: number, generos: string[]) {
    this.id = id;
    this.titulo = titulo;
    this.sinopse = sinopse;
    this.dataLancamento = dataLancamento;
    this.urlPoster = "https://image.tmdb.org/t/p/original" + urlPoster;
    this.urlSlide = "https://image.tmdb.org/t/p/original" + urlSlide;
    this.mediaNota = mediaNota;
    this.contagemVotos = contagemVotos;
    this.generos = generos;
    this.urlDetalhes = `detalhes.html?id=${id}`;
  }
}