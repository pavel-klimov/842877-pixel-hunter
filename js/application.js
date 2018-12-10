import IntroScreen from './presenter/intro';
import WelcomeScreen from './presenter/welcome';
import GameScreen from './presenter/game';
import GameModel from './model/game';
import StatsScreen from './presenter/stats';
import ErrorScreen from './presenter/error';
import changeContent from './moduls/change-content';

let question;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Application {
  static showLoading() {
    const intro = new IntroScreen();
    changeContent(intro.element);
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        question = data;
      })
      .then(() => Application.showWelcome())
      .catch((errorMassage) => Application.showError(errorMassage));
  }
  static showWelcome() {
    const welcome = new WelcomeScreen();
    changeContent(welcome.element);
  }
  static showGame() {
    const model = new GameModel(question);
    const game = new GameScreen(model);
    changeContent(game.element);
    game.startLevel();
  }
  static showStats(answers, lives) {
    const stats = new StatsScreen(answers, lives);
    changeContent(stats.element);
  }
  static showError(errorMassage) {
    const error = new ErrorScreen(errorMassage);
    changeContent(error.element);
  }
}
