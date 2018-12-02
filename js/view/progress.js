import AbstractView from './abstract-view';

export default class ProgressView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }

  get template() {
    let answers = ``;
    for (let i = 0; i < 10; i++) {
      if (!this.answers[i]) {
        answers += `<li class="stats__result stats__result--unknown"></li>`;
      } else if (!this.answers[i].isCorrect) {
        answers += `<li class="stats__result stats__result--wrong"></li>`;
      } else if (this.answers[i].time <= 10) {
        answers += `<li class="stats__result stats__result--slow"></li>`;
      } else if (this.answers[i].time > 20) {
        answers += `<li class="stats__result stats__result--fast"></li>`;
      } else {
        answers += `<li class="stats__result stats__result--correct"></li>`;
      }
    }
    return `
    <ul class="stats">
      ${answers}
    </ul>`;
  }
}
