export const MAX_LIVES = 3;
export const MAX_TIMER = 30;

export const BASE_PRICE = 100;
export const DELTA_PRICE = 50;

export const GAME_RULES = {
  answerCost: {
    slow: BASE_PRICE - DELTA_PRICE,
    normal: BASE_PRICE,
    quick: BASE_PRICE + DELTA_PRICE
  },
  costRange: {
    slow: [0, 10],
    normal: [11, 20],
    quick: [21, MAX_TIMER]
  },
  liveCost: DELTA_PRICE,
  questionCounters: 10
};

export const ALERT_TIME = 5;

export const DEBAG_MODE = true;

export const ONE_SECOND = 1000;

export const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};
export const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};
