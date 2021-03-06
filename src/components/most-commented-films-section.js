import AbstractComponent from './abstract-component';

export default class MostCommentedFilmsSection extends AbstractComponent {
  getTemplate() {
    return (`<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container" id="most-commented">
      </div>
    </section>`);
  }

  getFilmsListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  clear() {
    this.getElement().innerHTML = ``;
  }
}
