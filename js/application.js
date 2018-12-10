import IntroScreen from './presenter/intro';
import WelcomeScreen from './presenter/welcome';
import GameScreen from './presenter/game';
import GameModel from './model/game';
import StatsScreen from './presenter/stats';
import changeContent from './moduls/change-content';

export default class Application {
  static showLoading() {
    const intro = new IntroScreen();
    changeContent(intro.element);
  }
  static showWelcome() {
    const welcome = new WelcomeScreen();
    changeContent(welcome.element);
  }
  static showGame() {
    const model = new GameModel();
    const game = new GameScreen(model);
    changeContent(game.element);
    game.startLevel();
  }
  static showStats(answers, lives) {
    const stats = new StatsScreen(answers, lives);
    changeContent(stats.element);
  }
}
