import AbstractView from './abstract-view';

export default class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
    <section class="modal">
      <div class="modal__inner">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text modal__text--error">${this.error}</p>
      </div>
    </section>`;
  }
}
