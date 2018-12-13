import AbstractView from './abstract-view';

export default class WarningView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="modal">
      <form class="modal__inner">
        <button class="modal__close" type="button">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__button-wrapper">
          <button class="modal__btn modal__btn_ok">Ок</button>
          <button class="modal__btn modal__btn_cancel">Отмена</button>
        </div>
      </form>
    </section>`;
  }

  bind() {
    this.element.querySelector(`.modal__btn_ok`).addEventListener(`click`, this.onConfirme);
    this.element.querySelector(`.modal__btn_cancel`).addEventListener(`click`, this.onCancel);
    this.element.querySelector(`.modal__close`).addEventListener(`click`, this.onCancel);
  }

  onConfirme() {}
  onCancel() {}

}
