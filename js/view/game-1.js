import AbstractView from './abstract-view';
import ProgressView from './progress';
import {AnswerType} from '../data/constants';
import {addSpecialClass} from '../moduls/utils';

export default class GameOneView extends AbstractView {
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
      <form class="game__content">
        <div class="game__option">
          <img src="${this.question.answers[0].image.url}"
            width="${this.question.answers[0].image.width}"
            height="${this.question.answers[0].image.height}" alt="Option 1">
          <label class="game__answer game__answer--photo ${addSpecialClass(AnswerType.PHOTO, this.question.answers[0].type)}">
            <input class="visually-hidden" name="question1" type="radio" value="${AnswerType.PHOTO}">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint ${addSpecialClass(AnswerType.PAINTING, this.question.answers[0].type)}">
            <input class="visually-hidden" name="question1" type="radio" value="${AnswerType.PAINTING}">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${this.question.answers[1].image.url}"
          width="${this.question.answers[1].image.width}"
          height="${this.question.answers[1].image.height}" alt="Option 2">
          <label class="game__answer  game__answer--photo ${addSpecialClass(AnswerType.PHOTO, this.question.answers[1].type)}">
            <input class="visually-hidden" name="question2" type="radio" value="${AnswerType.PHOTO}">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint ${addSpecialClass(AnswerType.PAINTING, this.question.answers[1].type)}">
            <input class="visually-hidden" name="question2" type="radio" value="${AnswerType.PAINTING}">
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

  checkAnswer(target, callback) {
    const form = document.querySelector(`.game__content`);
    if (target.classList.contains(`visually-hidden`) && form.querySelector(`[name=question1]:checked`) && form.querySelector(`[name=question2]:checked`)) {
      const answer = {
        answers: [
          {type: form.querySelector(`[name=question1]:checked`).value},
          {type: form.querySelector(`[name=question2]:checked`).value}
        ]
      };
      callback(answer);
    }
  }

  onAnswer() {}
}
