import { FilmeService } from "../../services/filme.service";
import "./visualizar-filme-detalhes.css";

export class DetalhesFilme {
  pnlPrincipal: HTMLDivElement;
  filmeService: FilmeService;

  constructor() {
    this.pnlPrincipal = document.getElementById('pnlPrincipal') as HTMLDivElement;

    this.filmeService = new FilmeService();
  }
  }