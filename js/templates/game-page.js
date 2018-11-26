import getHeader from './header';
import getGameOnePage from './game-1';
import getGameTwoPage from './game-2';
import getGameThreePage from './game-3';
import getStatsPage from './stats';

const getGamePage = function (game) {
  const level = game.level;
  if ((level >= game.questions.length) || (game.liveCounter < 0)) {
    return getStatsPage(game);
  }
  const question = game.questions[level];
  let template;
  if (question.length === 1) {
    template = getGameTwoPage(game);
  } else if (question.length === 2) {
    template = getGameOnePage(game);
  } else {
    template = getGameThreePage(game);
  }

  let fragment = document.createDocumentFragment();
  fragment.appendChild(getHeader(game));
  fragment.appendChild(template);
  return fragment;
};
export default getGamePage;
