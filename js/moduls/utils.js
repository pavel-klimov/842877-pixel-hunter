import {DEBUG_MODE} from '../data/constants';
const RIGHT_ANSWER_CLASS = `game__right-answer`;
const WRONG_ANSWER_CLASS = ``;

export const addSpecialClass = function (option, answer) {
  if (DEBUG_MODE && (option === answer)) {
    return RIGHT_ANSWER_CLASS;
  }
  return WRONG_ANSWER_CLASS;
};

export const findRightAnswer = function (answers) {
  if (answers[0].type === answers[1].type) {
    return answers[2];
  } else if (answers[0].type === answers[2].type) {
    return answers[1];
  }
  return answers[0];
};
