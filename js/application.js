import IntroScreen from './presenter/intro';
import WelcomeScreen from './presenter/welcome';
import GameScreen from './presenter/game';
import GameModel from './model/game';
import StatsScreen from './presenter/stats';
import Loader from './moduls/loader';
import ErrorScreen from './presenter/error';
import changeContent from './moduls/change-content';

let question;

export default class Application {
  static showLoading() {
    const intro = new IntroScreen();
    changeContent(intro.element);
    Loader.loadData()
      .then((data) => {
        question = data;
      })
      .then(() => Application.showWelcome())
      .catch(Application.showError);
  }
  static showWelcome() {
    const welcome = new WelcomeScreen();
    changeContent(welcome.element);
  }
  static showGame(name) {
    const model = new GameModel(question);
    const game = new GameScreen(model);
    model.name = name;
    changeContent(game.element);
    game.startLevel();
  }
  static showStats(answers, lives, playerName) {
    const state = {
      date: new Date(),
      answers,
      lives
    };
    Loader.saveResults(state, playerName)
      .then(() => Loader.loadResults(playerName))
      .then((data) => new StatsScreen(answers, lives, data))
      .then((stats) => {
        changeContent(stats.element);
      })
      .catch(Application.showError);
  }
  static showError(errorMassage) {
    const error = new ErrorScreen(errorMassage);
    changeContent(error.element);
  }
}
