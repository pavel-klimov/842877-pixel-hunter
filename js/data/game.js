import getQuestions from './mock-game-questions';
import changeLiveCounter from '../moduls/change-live-counter';

const checkAnswer = function (answer, question) {
  if (question.length === 1) {
    return (question[0].type === answer.answers[0].type);
  } else if (question.length === 2) {
    return ((question[0].type === answer.answers[0].type) && (question[1].type === answer.answers[1].type));
  }
  return (question.find((elem) => elem.src === answer.src) && question.find((elem) => elem.src === answer.src).type === `paint`);
};

const Game = class {
  constructor(questions = getQuestions()) {
    this.liveCounter = 3;
    this.level = 0;
    this.questions = questions;
    this.answers = [];
  }
  get liveCounter() {
    if (this.live) {
      return this.live;
    }
    return 0;
  }
  set liveCounter(lives) {
    this.live = lives;
  }
  addDead() {
    this.liveCounter = changeLiveCounter(this.liveCounter);
  }
  getAnswer(answer) {
    let isCorrect = checkAnswer(answer, this.questions[this.level]);
    if (!isCorrect) {
      this.liveCounter -= 1;
    }
    this.answers.push({time: answer.time, isCorrect});
    this.level += 1;
  }
  resetGame() {
    return new Game(this.questions);
  }
};

export default Game;
