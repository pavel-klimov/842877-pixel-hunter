import AbstractView from './abstract-view';
import ProgressView from './progress';
import {addSpecialClass, findRightAnswer} from '../moduls/utils';

export default class GameThreeView extends AbstractView {
  constructor(question, answers) {
    super();
    this.question = question;
    this.answers = answers;
  }

  get template() {
    const progress = new ProgressView(this.answers);
    const rightAnswer = findRightAnswer(this.question.answers);
    return `
    <section class="game">
      <p class="game__task">${this.question.question}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option ${addSpecialClass(this.question.answers[0].type, rightAnswer.type)}">
          <img src="${this.question.answers[0].image.url}"
          width="${this.question.answers[0].image.width}"
          height="${this.question.answers[0].image.height}" alt="Option 1">
        </div>
        <div class="game__option  ${addSpecialClass(this.question.answers[1].type, rightAnswer.type)} game__option--selected">
          <img src="${this.question.answers[1].image.url}"
          width="${this.question.answers[1].image.width}"
          height="${this.question.answers[1].image.height}" alt="Option 2">
        </div>
        <div class="game__option ${addSpecialClass(this.question.answers[2].type, rightAnswer.type)}">
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

  checkAnswer(target, callback) {
    if (target.tagName === `IMG`) {
      const answer = {
        url: target.src
      };
      callback(answer);
    } else if (target.classList.contains(`game__option`)) {
      const answer = {
        url: target.querySelector(`img`).src
      };
      callback(answer);
    }
  }

  onAnswer() {}
}
