import AbstractComponent from '../components/abstract-component';
import Filter from '../components/filter';
import {render, replace} from '../utils/render';

export default class FilterController extends AbstractComponent {
  constructor(moviesModel, container) {
    super();
    this._moviesModel = moviesModel;
    this._moviesModel.onDataChange(this.render.bind(this));
    this._container = container;
    this._filtersData = this._getFiltersData(this._moviesModel.getMovies());
  }

  _getFiltersData(films) {
    const getFilterCount = (title, flag = ``) => {
      return {
        title,
        flag,
        count: flag ? films.filter((film) => film[flag]).length : films.length,
      };
    };

    return [
      getFilterCount(`All movies`),
      getFilterCount(`History`, `isWatched`),
      getFilterCount(`Watchlist`, `inWatchlist`),
      getFilterCount(`Favorites`, `isFavorite`),
    ];
  }

  render() {
    const oldFilter = this._filter;
    this._filter = new Filter(this._filtersData, this._moviesModel.getFilter());
    if (oldFilter) {
      replace(this._filter, oldFilter);
    } else {
      render(this._container, this._filter);
    }

    this._filter.onChangeFilter(this._moviesModel.setFilter.bind(this._moviesModel));
  }
}
