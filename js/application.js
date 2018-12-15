import IntroScreen from './presenter/intro';
import WelcomeScreen from './presenter/welcome';
import RulesScreen from './presenter/rules';
import GameScreen from './presenter/game';
import GameModel from './model/game';
import StatsScreen from './presenter/stats';
import Loader from './moduls/loader';
import ErrorScreen from './presenter/error';
import WarningScreen from './presenter/warning';
import changeContent from './moduls/change-content';
import addContent from './moduls/add-content';
import crossfadeContent from './moduls/crossfade-content';

let question;

const loadAllImage = function (data) {
  const images = [];
  data.map((level) => level.answers.map((answer) => {
    images.push(Loader.loadImage(answer.image.url));
  }));
  return images;
};

const countCoefficient = function (image, frame) {
  let coefficient;
  if ((image.width / image.height) <= (frame.width / frame.height)) {
    coefficient = frame.height / image.height;
  } else {
    coefficient = frame.width / image.width;
  }
  return coefficient;
};

const bindAllImage = function (images) {
  question.map((level) => level.answers.map((answer) => {
    const element = images.shift();
    const coefficient = countCoefficient(element, answer.image);
    answer.image.width = element.width * coefficient;
    answer.image.height = element.height * coefficient;
    answer.image.element = element;
  }));
};

export default class Application {
  static showLoading() {
    const intro = new IntroScreen();
    changeContent(intro.element);
    Loader.loadData()
      .then((data) => {
        question = data;
        return data;
      })
      .then(loadAllImage)
      .then((avatarPromises) => Promise.all(avatarPromises))
      .then(bindAllImage)
      .then(() => Application.specialShowWelcome())
      .catch(Application.showError);
  }
  static showWelcome() {
    const welcome = new WelcomeScreen();
    changeContent(welcome.element);
  }
  static showRules() {
    const rules = new RulesScreen();
    changeContent(rules.element);
  }
  static specialShowWelcome() {
    const welcome = new WelcomeScreen();
    crossfadeContent(welcome.element);
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
    addContent(error.element);
  }
  static showWarning(onConfirmeCallback, onCancelCallback) {
    const warning = new WarningScreen(onConfirmeCallback, onCancelCallback);
    addContent(warning.element);
  }
}
