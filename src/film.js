/**
 * La classe Film sert de "moule" ou de modèle pour représenter un film.
 * C'est le principe de la Programmation Orientée Objet (POO).
 */
export default class Film {
  /**
   * Le constructeur est appelé avec new Film(donneesJSON)
   * On y range les informations reçues de l'API dans nos propres tiroirs (variables)
   */
  constructor(filmJSON) {
    this._id = filmJSON.id;
    this._title = filmJSON.title;
    this._original_title = filmJSON.original_title;
    this._poster_path = filmJSON.poster_path ?? '';
    this._backdrop_path = filmJSON.backdrop_path ?? '';
    this._overview = filmJSON.overview ?? '';
    this._genres = filmJSON.genres
      ? filmJSON.genres.map((g) => g.name).join(' / ')
      : '';
  }

  // Les "getters" (moyens d'accéder aux infos)
  get titre() {
    return this._title;
  }
  get titreOriginal() {
    return this._original_title;
  }
  get id() {
    return this._id;
  }
  get afficheFond() {
    return this._backdrop_path;
  }
  get affiche() {
    return this._poster_path;
  }
  get resume() {
    return this._overview;
  }
  get genres() {
    return this._genres;
  }

  // Une façon simple d'afficher le film sous forme de texte
  toString() {
    return `--> ${this._title} (${this._overview})`;
  }
}
