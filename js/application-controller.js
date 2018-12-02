import HeaderView from './view/header';
import IntroView from './view/intro';
import GreetingView from './view/greeting';
import RulesView from './view/rules';
import GameOneView from './view/game-1';
import GameTwoView from './view/game-2';
import GameThreeView from './view/game-3';
import StatsView from './view/stats';
import changeContent from './moduls/change-content';

export default (game) => {
  const headerElement = () => {
    const liveCounter = (game.liveCounter >= 0) ? game.liveCounter : 0;
    const headerView = new HeaderView(liveCounter);
    headerView.onBackClick = () => {
      game = game.resetGame();
      changeContent(greetingPage());
    };
    return headerView.element;
  };

  const introPage = () => {
    const introView = new IntroView();
    introView.onAsterickClick = () => changeContent(greetingPage());
    return introView.element;
  };

  const greetingPage = () => {
    const greetingView = new GreetingView();
    greetingView.onContinueClick = () => changeContent(rulesPage());
    return greetingView.element;
  };

  const rulesPage = () => {
    const rulesView = new RulesView();
    rulesView.onNameInput = () => {
      let form = document.querySelector(`.rules__form`);
      let submitButton = document.querySelector(`.rules__button`);
      submitButton.disabled = (form.checkValidity()) ? false : true;
    };
    rulesView.onNameSubmit = (evt) => {
      evt.preventDefault();
      const form = document.querySelector(`.rules__form`);
      if (form.checkValidity()) {
        changeContent(gamePage());
      }
    };

    let fragment = document.createDocumentFragment();
    fragment.appendChild(headerElement());
    fragment.appendChild(rulesView.element);
    return fragment;
  };

  const gamePage = () => {
    const level = game.level;
    if ((level >= game.questions.length) || (game.liveCounter < 0)) {
      return statsPage();
    }
    const question = game.questions[level];
    let gameScreen;
    if (question.length === 1) {
      gameScreen = new GameTwoView(question, game.answers);
      gameScreen.onAnswer = (evt) => {
        const target = evt.target;
        const form = document.querySelector(`.game__content`);
        if (target.classList.contains(`visually-hidden`)) {
          if (form.querySelector(`[name=question1]:checked`)) {
            let answer = {
              time: 15,
              answers: [
                {type: form.querySelector(`[name=question1]:checked`).value},
              ]
            };
            game.getAnswer(answer);
            changeContent(gamePage());
          }
        }
      };
    } else if (question.length === 2) {
      gameScreen = new GameOneView(question, game.answers);
      gameScreen.onAnswer = (evt) => {
        const target = evt.target;
        const form = document.querySelector(`.game__content`);
        if (target.classList.contains(`visually-hidden`)) {
          if (form.querySelector(`[name=question1]:checked`) && form.querySelector(`[name=question2]:checked`)) {
            let answer = {
              time: 15,
              answers: [
                {type: form.querySelector(`[name=question1]:checked`).value},
                {type: form.querySelector(`[name=question2]:checked`).value}
              ]
            };
            game.getAnswer(answer);
            changeContent(gamePage());
          }
        }
      };
    } else {
      gameScreen = new GameThreeView(question, game.answers);
      gameScreen.onAnswer = (evt) => {
        const target = evt.target;
        if (target.tagName === `IMG`) {
          let answer = {
            time: 15,
            src: target.src
          };
          game.getAnswer(answer);
          changeContent(gamePage());
        }
      };
    }
    let fragment = document.createDocumentFragment();
    fragment.appendChild(headerElement());
    fragment.appendChild(gameScreen.element);
    return fragment;
  };

  const statsPage = () => {
    const statsView = new StatsView(game.answers, game.liveCounter);
    let fragment = document.createDocumentFragment();
    fragment.appendChild(headerElement());
    fragment.appendChild(statsView.element);
    return fragment;
  };

  changeContent(introPage());
};
