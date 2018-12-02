import AbstractView from './abstract-view';
import ProgressView from './progress';

export default class GameTwoView extends AbstractView {
  constructor(question, answers) {
    super();
    this.question = question;
    this.answers = answers;
  }

  get template() {
    const progress = new ProgressView(this.answers);
    return `
    <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${this.question[0].src}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
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
