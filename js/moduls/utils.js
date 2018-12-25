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
  const result = {};
  for (let answer of answers) {
    if (result[answer.type]) {
      result[answer.type].push(answer);
    } else {
      result[answer.type] = [answer];
    }
  }
  for (let key in result) {
    if (result[key].length === 1) {
      return result[key][0];
    }
  }
  return false;
};
