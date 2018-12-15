import AbstractView from './abstract-view';
import {GAME_RULES} from '../data/constants';

export default class ProgressView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }

  get template() {
    let answers = ``;
    for (let i = 0; i < GAME_RULES.questionCounters; i++) {
      if (!this.answers[i]) {
        answers += `<li class="stats__result stats__result--unknown"></li>`;
      } else if (!this.answers[i].isCorrect) {
        answers += `<li class="stats__result stats__result--wrong"></li>`;
      } else if ((this.answers[i].time >= GAME_RULES.costRange.slow[0]) && (this.answers[i].time <= GAME_RULES.costRange.slow[1])) {
        answers += `<li class="stats__result stats__result--slow"></li>`;
      } else if ((this.answers[i].time >= GAME_RULES.costRange.quick[0]) && (this.answers[i].time <= GAME_RULES.costRange.quick[1])) {
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
