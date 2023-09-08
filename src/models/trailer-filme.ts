export class TrailerFilme {
  id: string;
  sourceUrl: string;

  constructor(id: string, sourceUrl: string) {
    this.id = id;
    this.sourceUrl = `https://www.youtube.com/embed/${sourceUrl}`;
  }
}