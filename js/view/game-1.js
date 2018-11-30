// import getProgress from './progress';
// import getElementFromTemplate from '../moduls/get-element-from-template';
// import getGamePage from './game-page';
// import changeContent from '../moduls/change-content';

import AbstractView from './abstract-view';

export default class GameOneView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `
    <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${this.question[0].src}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${this.question[1].src}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  </section>`;
  }

  bind() {
    this.template.querySelector(`.game__content`).addEventListener(`click`, this.onAnswer);
  }

  onAnswer() {}
}

/*
const getGameOnePage = function (game) {
  const question = game.questions[game.level];
  const template = getElementFromTemplate(`
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${question[0].src}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${question[1].src}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${getProgress(game)}
  </section>`);

  const form = template.querySelector(`.game__content`);

  form.addEventListener(`click`, (evt) => {
    const target = evt.target;
    if (target.classList.contains(`visually-hidden`)) {
      if (form.querySelector(`[name=question1]:checked`) && form.querySelector(`[name=question2]:checked`)) {
        let answer = {
          time: 15,
          answers: [
            {type: form.querySelector(`[name=question1]:checked`).value},
            {type: form.querySelector(`[name=question2]:checked`).value}
          ]
        };
        game.getAnswer(answer);
        changeContent(getGamePage(game));
      }
    }
  });

  return template;
};
export default getGameOnePage;
*/
