import AbstractView from './abstract-view';
import ProgressView from './progress';

import countGamePoints from '../moduls/count-game-points';

export default class StatsView extends AbstractView {
  constructor(answers, lives) {
    super();
    this.answers = answers;
    this.lives = lives;
  }

  get template() {
    const progress = new ProgressView(this.answers);
    const countSpecialPrice = function (answers) {
      let fast = 0;
      let slow = 0;
      let rightAnswers = 0;
      answers.forEach((answer) => {
        if ((answer.time <= 10) && (answer.time >= 0) && answer.isCorrect) {
          slow++;
        } else if (answer.time > 20 && answer.isCorrect) {
          fast++;
        }
        if (answer.isCorrect) {
          rightAnswers++;
        }
      });
      return [slow, fast, rightAnswers];
    };
    const gamePoints = countGamePoints(this.answers, this.lives);
    const title = ((gamePoints === -1) || (this.lives === -1)) ? `Поражение.` : `Победа!`;
    const [slow, fast, rightAnswers] = countSpecialPrice(this.answers);
    const elementFast = (fast === 0) ? `` : `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${fast} <span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${fast * 50}</td>
    </tr>`;
    const elementSlow = (slow === 0) ? `` : `<tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${slow} <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">-${slow * 50}</td>
    </tr>`;
    const elementLive = (this.lives <= 0) ? `` : `<tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${this.lives} <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${this.lives * 50}</td>
    </tr>`;
    const gameResult = (gamePoints <= -1) ? `FAIL` : gamePoints;
    return `
    <section class="result">
    <h2 class="result__title">${title}</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${progress.template}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${rightAnswers * 100}</td>
      </tr>
      ${elementFast}
      ${elementLive}
      ${elementSlow}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${gameResult}</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
  </section>`;
  }
}
