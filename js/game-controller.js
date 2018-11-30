import getHeader from './header';
import GameOneView from './view/game-1';
import GameTwoView from './view/game-2';
import GameThreeView from './view/game-3';
import getStatsPage from './stats';
import changeContent from './moduls/change-content';

const getGamePage = function (game) {
  const level = game.level;
  if ((level >= game.questions.length) || (game.liveCounter < 0)) {
    changeContent(getStatsPage(game));
  }
  const question = game.questions[level];
  let gameScreen;
  if (question.length === 1) {
    gameScreen = new GameTwoView(question);
    const form = gameScreen.element.querySelector(`.game__content`);
    gameScreen.onAnswer = (evt) => {
      const target = evt.target;
      if (target.classList.contains(`visually-hidden`)) {
        if (form.querySelector(`[name=question1]:checked`)) {
          let answer = {
            time: 15,
            answers: [
              {type: form.querySelector(`[name=question1]:checked`).value},
            ]
          };
          game.getAnswer(answer);
          changeContent(gameScreen.element);
        }
      }
    };
  } else if (question.length === 2) {
    gameScreen = new GameOneView(question);
  } else {
    gameScreen = new GameThreeView(question);
  }

  let fragment = document.createDocumentFragment();
  fragment.appendChild(getHeader(game));
  fragment.appendChild();
  return fragment;
};
export default getGamePage;
