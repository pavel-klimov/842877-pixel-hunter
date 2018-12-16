import {DEBAG_MODE} from '../data/constants';
const RIGHT_ANSWER_CLASS = `game__right-answer`;
const WRONG_ANSWER_CLASS = ``;

export const addSpecialClass = function (option, answer) {
  if (DEBAG_MODE && (option === answer)) {
    return RIGHT_ANSWER_CLASS;
  }
  return WRONG_ANSWER_CLASS;
};

export const findRightAnswer = function (answers) {
  if (answers[0].type === answers[1].type) {
    return 2;
  } else if (answers[0].type === answers[2].type) {
    return 1;
  }
  return 0;
};
