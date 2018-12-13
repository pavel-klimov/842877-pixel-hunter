import HeaderView from '../view/header';
import GameOneView from '../view/game-1';
import GameTwoView from '../view/game-2';
import GameThreeView from '../view/game-3';
import changeContent from '../moduls/change-content';
import {ONE_SECOND, QuestionType} from '../data/constants';
import Application from '../application';

const Timer = class {
  constructor(time) {
    this._time = time;
  }
  get time() {
    return this._time;
  }
  startTimer(callback) {
    this._timer = setTimeout(() => {
      let repeat = callback();
      if (repeat) {
        this.startTimer(callback);
      }
    }, ONE_SECOND);
  }
  stopTimer() {
    clearTimeout(this._timer);
  }
};


export default class GameScreen {
  constructor(gameModel) {
    this.model = gameModel;
    this.timer = new Timer(this.model.time);
    this.header = new HeaderView(this.model.liveCounter, this.model.time);
    this._timerCallback = () => {
      this.model.time = this.model.time - 1;
      if (this.model.time < 0) {
        this.timer.stopTimer();
        this.nextLevel();
        return false;
      }
      this.header.timerUpdate(this.model.time);
      return true;
    };
    this.header.onBackClick = () => {
      this.timer.stopTimer();
      Application.showWarning(Application.showWelcome, () => this.timer.startTimer(this._timerCallback));
    };
    this.content = this.getLevelContent();
  }
  get element() {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(this.header.element);
    fragment.appendChild(this.content.element);
    return fragment;
  }
  getLevelContent() {
    const level = this.model.level;
    const question = this.model.questions[level];
    let content;
    if (question.type === QuestionType.TINDER_LIKE) {
      content = new GameTwoView(question, this.model.answers);
      content.onAnswer = (evt) => {
        const target = evt.target;
        const form = document.querySelector(`.game__content`);
        if (target.classList.contains(`visually-hidden`)) {
          if (form.querySelector(`[name=question1]:checked`)) {
            let answer = {
              answers: [
                {type: form.querySelector(`[name=question1]:checked`).value},
              ]
            };
            this.nextLevel(answer);
          }
        }
      };
    } else if (question.type === QuestionType.TWO_OF_TWO) {
      content = new GameOneView(question, this.model.answers);
      content.onAnswer = (evt) => {
        const target = evt.target;
        const form = document.querySelector(`.game__content`);
        if (target.classList.contains(`visually-hidden`)) {
          if (form.querySelector(`[name=question1]:checked`) && form.querySelector(`[name=question2]:checked`)) {
            let answer = {
              answers: [
                {type: form.querySelector(`[name=question1]:checked`).value},
                {type: form.querySelector(`[name=question2]:checked`).value}
              ]
            };
            this.nextLevel(answer);
          }
        }
      };
    } else {
      content = new GameThreeView(question, this.model.answers);
      content.onAnswer = (evt) => {
        const target = evt.target;
        if (target.tagName === `IMG`) {
          let answer = {
            url: target.src
          };
          this.nextLevel(answer);
        } else if (target.classList.contains(`game__option`)) {
          let answer = {
            url: target.querySelector(`img`).src
          };
          this.nextLevel(answer);
        }
      };
    }
    return content;
  }
  startLevel() {
    this.timer.startTimer(this._timerCallback);
  }
  nextLevel(answer) {
    this.timer.stopTimer();
    this.model.getAnswer(answer);
    if ((this.model.level >= this.model.questions.length) || (this.model.liveCounter < 0)) {
      Application.showStats(this.model.answers, this.model.liveCounter, this.model.name);
    } else {
      const next = new GameScreen(this.model);
      changeContent(next.element);
      next.startLevel();
    }
  }
}
