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
    <p class="game__task">${this.question.question}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${this.question.answers[0].image.url}"
        width="${this.question.answers[0].image.width}"
        height="${this.question.answers[0].image.height}" alt="Option 1">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${this.question.answers[1].image.url}"
        width="${this.question.answers[1].image.width}"
        height="${this.question.answers[1].image.height}" alt="Option 2">
      </div>
      <div class="game__option">
        <img src="${this.question.answers[2].image.url}"
        width="${this.question.answers[2].image.width}"
        height="${this.question.answers[2].image.height}" alt="Option 3">
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
