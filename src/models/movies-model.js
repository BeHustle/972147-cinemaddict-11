import {changeArrayElement} from '../utils/array';

export default class MoviesModel {
  constructor() {
    this._filterObservers = [];
    this._activeFilter = ``;
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._filterObservers.forEach((cb) => cb());
  }

  getFilter() {
    return this._activeFilter;
  }

  onFilterChange(cb) {
    this._filterObservers.push(cb);
  }

  getMovies() {
    if (this._activeFilter) {
      return this._movies.filter((movie) => movie[this._activeFilter]);
    }
    return this._movies;
  }

  setMovies(movies) {
    this._movies = movies;
  }

  getMovie(id) {
    const index = this._movies.findIndex((it) => it.id === id);
    return this._movies[index];
  }

  setMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }
    const newMovies = changeArrayElement(this._movies.slice(), movie, index);
    this.setMovies(newMovies);
  }
}
