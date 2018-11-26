import getHeader from './header';
import getProgress from './progress';
import getElementFromTemplate from '../moduls/get-element-from-template';
import countGamePoints from '../moduls/count-game-points';

const countSpecialPrice = function (answers) {
  let fast = 0;
  let slow = 0;
  let rightAnswers = 0;
  answers.forEach((answer) => {
    if (answer.time <= 10) {
      slow++;
    } else if (answer.time > 20) {
      fast++;
    }
    if (answer.isCorrect) {
      rightAnswers++;
    }
  });
  return [slow, fast, rightAnswers];
};
const getStatsPage = function (game) {
  const gamePoints = countGamePoints(game.answers, game.liveCounter);
  const title = ((gamePoints === -1) || (game.liveCounter === -1)) ? `Поражение.` : `Победа!`;
  const [slow, fast, rightAnswers] = countSpecialPrice(game.answers);
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
  const elementLive = (game.liveCounter <= 0) ? `` : `<tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${game.liveCounter} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${game.liveCounter * 50}</td>
  </tr>`;
  const gameResult = (gamePoints <= -1) ? `FAIL` : gamePoints;
  const template = getElementFromTemplate(`
  <section class="result">
    <h2 class="result__title">${title}</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${getProgress(game)}
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
  </section>`);

  let fragment = document.createDocumentFragment();
  fragment.appendChild(getHeader(game));
  fragment.appendChild(template);
  return fragment;
};
export default getStatsPage;
