import { IFavoritosFilmes } from "../models/favoritos-filme";

export class RepositorioFilme {
    public carregarFavoritosSalvos(): IFavoritosFilmes {
        const favoritosJSON = localStorage.getItem('favoritos');
        if (favoritosJSON) {
            return JSON.parse(favoritosJSON);
        } else {
            return {
                favoritosIds: [],
            };
        }
    }

    public salvarFavoritos(favoritos: IFavoritosFilmes) {
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
}