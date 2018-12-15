import AbstractView from './abstract-view';
import ProgressView from './progress';
import countGamePoints from '../moduls/count-game-points';
import {GAME_RULES, DELTA_PRICE} from '../data/constants';

const countSpecialPrice = function (answers) {
  let fast = 0;
  let slow = 0;
  let rightAnswers = 0;
  answers.forEach((answer) => {
    if (answer.isCorrect) {
      if ((answer.time <= GAME_RULES.costRange.slow[1]) && (answer.time >= GAME_RULES.costRange.slow[0])) {
        slow++;
      } else if ((answer.time <= GAME_RULES.costRange.quick[1]) && (answer.time >= GAME_RULES.costRange.quick[0])) {
        fast++;
      }
      rightAnswers++;
    }
  });
  return [slow, fast, rightAnswers];
};

const gameResults = function (answers, lives, index = `#`) {
  const progress = new ProgressView(answers);
  const [slow, fast, rightAnswers] = countSpecialPrice(answers);
  const gamePoints = countGamePoints(answers, lives);
  const gameResult = (gamePoints <= -1) ? `FAIL` : gamePoints;
  const resultSimple = (gameResult === `FAIL`) ? `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
  ` : `
    <td class="result__points">× ${GAME_RULES.answerCost.normal}</td>
    <td class="result__total">${rightAnswers * GAME_RULES.answerCost.normal}</td>
  `;
  const elementFast = ((fast === 0) || (gameResult === `FAIL`)) ? `` : `<tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${fast} <span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">× ${DELTA_PRICE}</td>
    <td class="result__total">${fast * DELTA_PRICE}</td>
  </tr>`;
  const elementSlow = ((slow === 0) || (gameResult === `FAIL`)) ? `` : `<tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${slow} <span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">× ${DELTA_PRICE}</td>
    <td class="result__total">-${slow * DELTA_PRICE}</td>
  </tr>`;
  const elementLive = ((lives <= 0) || (gameResult === `FAIL`)) ? `` : `<tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${lives} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× ${GAME_RULES.liveCost}</td>
    <td class="result__total">${lives * GAME_RULES.liveCost}</td>
  </tr>`;
  const resultTotal = (gameResult === `FAIL`) ? `` : `<tr>
    <td colspan="5" class="result__total  result__total--final">${gameResult}</td>
  </tr>`;
  return `<table class="result__table">
  <tr>
    <td class="result__number">${index}.</td>
    <td colspan="2">
      ${progress.template}
    </td>
    ${resultSimple}
  </tr>
  ${elementFast}
  ${elementLive}
  ${elementSlow}
  ${resultTotal}
</table>`;
};

export default class StatsView extends AbstractView {
  constructor(answers, lives, data) {
    super();
    this.answers = answers;
    this.lives = lives;
    this.data = data;
  }

  get template() {
    const gamePoints = countGamePoints(this.answers, this.lives);
    const title = ((gamePoints === -1) || (this.lives === -1)) ? `Поражение.` : `Победа!`;
    let index = 1;
    let tables = gameResults(this.answers, this.lives, index++);
    for (const data of this.data) {
      if ((data.answer !== this.answers) && (data.lives !== this.lives)) {
        tables += gameResults(data.answers, data.lives, index++);
      }
    }
    return `
    <section class="result">
      <h2 class="result__title">${title}</h2>
      ${tables}
    </section>`;
  }
}
