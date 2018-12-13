import {MAX_LIVES, MAX_TIMER, QuestionType} from '../data/constants';
import {findRightAnswer} from '../moduls/utils';

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
  constructor(questions) {
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
