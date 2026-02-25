// un film
export class Acteur {
constructor(acteurJSON) {
// en paramètre un film au format JSON
this._id = acteurJSON.id;
this._name = acteurJSON.name;
this._profile_path = acteurJSON.profile_path ?? '';
}
get nom() { return this._name;}
get id() { return this._id;}
get photo() { return this._profile_path;}
toString() { return `--> ${this._name}`;}
}