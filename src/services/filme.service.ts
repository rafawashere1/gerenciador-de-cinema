import { API_KEY } from "../../secrets";
import { DetalhesFilme } from "../models/detalhes-filme";
import { ListagemFilme } from "../models/listagem-filme";
import { TrailerFilme } from "../models/trailer-filme";

export class FilmeService {
  
  selecionarFilmesPorPopularidade(): Promise<ListagemFilme[]> {
    const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1`;

    return fetch(url, this.obterHeaderAutorizacao())
      .then((res) => this.processarResposta(res))
      .then((obj) => this.mapearFilmes(obj.results));
  }

  selecionarDetalhesFilmePorId(id: number): Promise<DetalhesFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}`;

    return fetch(url, this.obterHeaderAutorizacao())
      .then((res) => this.processarResposta(res))
      .then((obj) => this.mapearDetalhesFilme(obj));
  }

  selecionarTrailersPorId(id: number): Promise<TrailerFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}`;

    return fetch(url, this.obterHeaderAutorizacao())
    .then((res) => this.processarResposta(res))
    .then((obj) => this.mapearTrailersFilme(obj));
  }

  private processarResposta(resposta: Response): Promise<any> {
    if (resposta.ok)
      return resposta.json();

    throw new Error('Ocorreu um erro ao tentar obter os dados requisitados!');
  }

  private mapearDetalhesFilme(obj: any): DetalhesFilme {
    return obj.map((obj: any) => {
      return new DetalhesFilme(
        obj.id,
        obj.title,
        obj.overview,
        obj.release_date,
        obj.poster_path,
        obj.backdrop_path,
        obj.vote_average,
        obj.vote_count,
        obj.genres
      )
    })
  }

  private mapearTrailersFilme(obj: any): TrailerFilme {
    return obj.map((obj: any) => {
      
    })
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