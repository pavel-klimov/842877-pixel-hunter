import AbstractView from './abstract-view';
import {MAX_LIVES, MAX_TIMER} from '../data/constants';

export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится ${MAX_TIMER} секунд.</li>
      <li>Ошибиться можно не более ${MAX_LIVES} раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя" required>
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`;
  }

  bind() {
    this.element.querySelector(`.rules__form`).addEventListener(`input`, this.onNameInput);
    this.element.querySelector(`.rules__button`).addEventListener(`click`, this.onNameSubmit);
  }

  onNameInput() {}
  onNameSubmit() {}
}

/*
import getHeader from './header';
import getElementFromTemplate from '../moduls/get-element-from-template';
import getGamePage from './game-page';
import changeContent from '../moduls/change-content';

const getRulesPage = function (game) {
  const template = getElementFromTemplate(`
  <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя" required>
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`);
  const form = template.querySelector(`.rules__form`);
  const submitButton = template.querySelector(`.rules__button`);

  form.addEventListener(`input`, () => {
    submitButton.disabled = (form.checkValidity()) ? false : true;
  });
  submitButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (form.checkValidity()) {
      changeContent(getGamePage(game));
    }
  });

  let fragment = document.createDocumentFragment();
  fragment.appendChild(getHeader(game));
  fragment.appendChild(template);
  return fragment;
};

export default getRulesPage;
*/
