import { API_KEY } from "../../secrets";
import { CreditosFilme } from "../models/creditos-filme";
import { DetalhesFilme } from "../models/detalhes-filme";
import { IFavoritosFilmes } from "../models/favoritos-filme";
import { ListagemFilme } from "../models/listagem-filme";
import { TrailerFilme } from "../models/trailer-filme";
import { RepositorioFilme } from "./filme-repositorio";

export class FilmeService {
  private repositorioFilme: RepositorioFilme;
  public favoritos: IFavoritosFilmes;

  constructor() {
    this.repositorioFilme = new RepositorioFilme();
    this.favoritos = this.repositorioFilme.carregarFavoritosSalvos();
  }
  
  selecionarFilmesPorPopularidade(): Promise<ListagemFilme[]> {
    const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1`;

    return fetch(url, this.obterHeaderAutorizacao())
      .then((res) => this.processarResposta(res))
      .then((obj) => this.mapearFilmes(obj.results));
  }

  selecionarFilmesFavoritos(ids: string[]): Promise<DetalhesFilme[]> {
    const promessas = ids.map((id) => {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

      return fetch(url, this.obterHeaderAutorizacao())
        .then((res) => this.processarResposta(res))
        .then((obj) => this.mapearDetalhesFilme(obj));
    });

    return Promise.all(promessas);
}

  selecionarFilmePorId(id: string): Promise<DetalhesFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

    return fetch(url, this.obterHeaderAutorizacao())
      .then((res) => this.processarResposta(res))
      .then((obj) => this.mapearDetalhesFilme(obj))
  }

  selecionarTrailersPorId(id: string): Promise<TrailerFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`;

    return fetch(url, this.obterHeaderAutorizacao())
    .then((res) => this.processarResposta(res))
    .then((obj) => this.mapearTrailersFilme(obj));
  }

  selecionarCreditosPorId(id: string): Promise<CreditosFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

    return fetch (url, this.obterHeaderAutorizacao())
    .then((res) => this.processarResposta(res))
    .then((obj) => this.mapearCreditosFilme(obj));
  }

  private processarResposta(resposta: Response): Promise<any> {
    if (resposta.ok)
      return resposta.json();

    throw new Error('Ocorreu um erro ao tentar obter os dados requisitados!');
  }

  private mapearDetalhesFilme(obj: any): DetalhesFilme {
    console.log(obj.genres);
    return new DetalhesFilme(
      obj.id,
      obj.title,
      obj.overview,
      obj.release_date,
      obj.poster_path,
      obj.backdrop_path,
      obj.vote_average,
      obj.vote_count,
      obj.genres.map((genero: any) => genero.name),
    );
  }

  private mapearTrailersFilme(obj: any): TrailerFilme {
    if (Array.isArray(obj.results) && obj.results.length > 0) {
      const firstVideo = obj.results[0];
      return new TrailerFilme(firstVideo.id, firstVideo.key);
    } else {

      return new TrailerFilme(obj.id, '');
    }
  }

  private mapearCreditosFilme(obj: any): CreditosFilme {
    if (obj && obj.cast && Array.isArray(obj.cast) && obj.cast.length > 0) {
      const primeiroCredito = obj.cast[0];
      
      return new CreditosFilme(
        primeiroCredito.order,
        primeiroCredito.name,
        primeiroCredito.known_for_department,
        primeiroCredito.profile_path,
        primeiroCredito.character
      );
    } else {

      return new CreditosFilme(obj.order, '', '', '', '');
    }
  }

  private mapearFilmes(obj: any): ListagemFilme[] {
    return obj.map((obj: any) => {
      return new ListagemFilme(
        obj.id,
        obj.title,
        obj.overview,
        obj.poster_path,
        obj.backdrop_path
      )
    })
  }

  private obterHeaderAutorizacao() {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  }
}