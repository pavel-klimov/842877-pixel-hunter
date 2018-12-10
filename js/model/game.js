import getQuestions from '../data/mock-game-questions';
import changeLiveCounter from '../moduls/change-live-counter';
import {MAX_LIVES, MAX_TIMER, QuestionType} from '../data/constants';

const findRightAnswer = function (answers) {
  if (answers[0].type === answers[1].type) {
    return 2;
  } else if (answers[0].type === answers[2].type) {
    return 1;
  }
  return 0;
};

const checkAnswer = function (answer, question) {
  if (question.type === QuestionType.TINDER_LIKE) {
    return (question.answers[0].type === answer.answers[0].type);
  } else if (question.type === QuestionType.TWO_OF_TWO) {
    return ((question.answers[0].type === answer.answers[0].type) && (question.answers[1].type === answer.answers[1].type));
  }
  const index = findRightAnswer(question.answers);
  return (question.answers[index].image.url === answer.url);
};

const GameModel = class {
  constructor(questions = getQuestions()) {
    this.level = 0;
    this.questions = questions;
    this.answers = [];
    this._live = MAX_LIVES;
    this._time = MAX_TIMER;
  }
  get liveCounter() {
    return (this._live < 0) ? -1 : this._live;
  }
  set liveCounter(lives) {
    this._live = lives;
  }
  get time() {
    return (this._time < 0) ? -1 : this._time;
  }
  set time(time) {
    this._time = (time > MAX_TIMER) ? MAX_TIMER : time;
  }
  addDead() {
    this.liveCounter = changeLiveCounter(this.liveCounter);
  }
  getAnswer(answer) {
    let isCorrect = (answer) ? checkAnswer(answer, this.questions[this.level]) : false;
    if (!isCorrect) {
      this.liveCounter -= 1;
    }
    this.answers.push({time: this.time, isCorrect});
    this.level += 1;
    this.time = MAX_TIMER;
  }
  resetGame() {
    return new GameModel(this.questions);
  }
};

export default GameModel;
