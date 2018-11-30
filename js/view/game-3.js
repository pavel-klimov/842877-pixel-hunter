import AbstractView from './abstract-view';

export default class GameOneView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `
    <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${this.question[0].src}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${this.question[1].src}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${this.question[2].src}" alt="Option 3" width="304" height="455">
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
import getProgress from './progress';
import getElementFromTemplate from '../moduls/get-element-from-template';
import getGamePage from './game-page';
import changeContent from '../moduls/change-content';

const getGameTreePage = function (game) {
  const question = game.questions[game.level];
  const template = getElementFromTemplate(`
  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${question[0].src}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${question[1].src}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${question[2].src}" alt="Option 3" width="304" height="455">
      </div>
    </form>
    ${getProgress(game)}
  </section>`);

  const form = template.querySelector(`.game__content`);

  form.addEventListener(`click`, (evt) => {
    const target = evt.target;
    if (target.tagName === `IMG`) {
      let answer = {
        time: 15,
        src: target.src
      };
      game.getAnswer(answer);
      changeContent(getGamePage(game));
    }
  });
  return template;
};
export default getGameTreePage;
*/
