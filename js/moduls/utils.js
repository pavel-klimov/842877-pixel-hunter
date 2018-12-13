import {DEBAG_MOD} from '../data/constants';

export const addSpecialClass = function (option, answer) {
  if (DEBAG_MOD && (option === answer)) {
    return `game__right-answer`;
  }
  return ``;
};

export const findRightAnswer = function (answers) {
  if (answers[0].type === answers[1].type) {
    return 2;
  } else if (answers[0].type === answers[2].type) {
    return 1;
  }
  return 0;
};
