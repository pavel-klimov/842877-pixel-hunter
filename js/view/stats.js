import AbstractView from './abstract-view';
import ProgressView from './progress';
import countGamePoints from '../moduls/count-game-points';

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

const gameResults = function (answers, lives, index = `#`) {
  const progress = new ProgressView(answers);
  const [slow, fast, rightAnswers] = countSpecialPrice(answers);
  const gamePoints = countGamePoints(answers, lives);
  const gameResult = (gamePoints <= -1) ? `FAIL` : gamePoints;
  const elementFast = ((fast === 0) || (gameResult === `FAIL`)) ? `` : `<tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${fast} <span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${fast * 50}</td>
  </tr>`;
  const elementSlow = ((slow === 0) || (gameResult === `FAIL`)) ? `` : `<tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${slow} <span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">-${slow * 50}</td>
  </tr>`;
  const elementLive = ((lives <= 0) || (gameResult === `FAIL`)) ? `` : `<tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${lives} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${lives * 50}</td>
  </tr>`;
  return `<table class="result__table">
  <tr>
    <td class="result__number">${index}.</td>
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
    for (let i = 0; i < this.data.length; i++) {
      if ((this.data[i].answer !== this.answers) && (this.data[i].lives !== this.lives)) {
        tables += gameResults(this.data[i].answers, this.data[i].lives, index++);
      }
    }
    return `
    <section class="result">
    <h2 class="result__title">${title}</h2>
    ${tables}
  </section>`;
  }
}
