import { API_KEY } from "../../secrets";
import { ListagemFilme } from "../models/listagem-filme";

export class FilmeService {
  
  selecionarFilmesPorPopularidade(): Promise<ListagemFilme[]> {
    const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1`;

    return fetch(url, this.obterHeaderAutorizacao())
      .then((res) => this.processarResposta(res))
      .then((obj) => this.mapearFilmes(obj.results));
  }

  private processarResposta(resposta: Response): Promise<any> {
    if (resposta.ok)
      return resposta.json();

    throw new Error('Ocorreu um erro ao tentar obter os dados requisitados!');
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