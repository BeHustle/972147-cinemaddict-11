import {
  createElement,
  getFormatDuration
} from "../util";

const CONTROLS_ACTIVE_BTN_CLASS = `film-card__controls-item--active`;

export default class FilmCard {
  constructor(film) {
    this._film = film;
  }

  getTemplate() {
    const {
      title, rating, date, duration,
      genres, description, poster, comments,
      isFavourite, isWatched, inWatchlist,
    } = this._film;
    const filmYear = date.getFullYear();
    const filmDuration = getFormatDuration(duration);
    const filmGenre = genres.join(`, `);
    const countComments = `${comments.length} comments`;
    const favoriteFilm = isFavourite ? CONTROLS_ACTIVE_BTN_CLASS : ``;
    const watchedFilm = isWatched ? CONTROLS_ACTIVE_BTN_CLASS : ``;
    const watchlistFilm = inWatchlist ? CONTROLS_ACTIVE_BTN_CLASS : ``;

    return (`<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${filmYear}</span>
            <span class="film-card__duration">${filmDuration}</span>
            <span class="film-card__genre">${filmGenre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${countComments}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistFilm}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedFilm}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteFilm}">Mark as favorite</button>
          </form>
        </article>`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  onShowPopup(cb) {
    this
      .getElement()
      .querySelector(`img`)
      .addEventListener(`click`, cb);

    this
      .getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, cb);

    this
      .getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, cb);
  }

  removeElement() {
    this._element = null;
  }
}