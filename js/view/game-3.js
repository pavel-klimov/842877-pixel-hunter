import AbstractView from './abstract-view';
import ProgressView from './progress';

export default class GameThreeView extends AbstractView {
  constructor(question, answers) {
    super();
    this.question = question;
    this.answers = answers;
  }

  get template() {
    const progress = new ProgressView(this.answers);
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
    ${progress.template}
  </section>`;
  }

  bind() {
    this.element.querySelector(`.game__content`).addEventListener(`click`, this.onAnswer);
  }

  onAnswer() {}
}
