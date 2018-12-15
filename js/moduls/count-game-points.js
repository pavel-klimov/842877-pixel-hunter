import {GAME_RULES} from '../data/constants';

const countGamePoints = function (gameResult = null, liveCounter = null) {
  if (!Array.isArray(gameResult) || (gameResult.length < GAME_RULES.questionCounters) || !Number.isInteger(liveCounter) || (liveCounter < 0)) {
    return -1;
  }
  let gamePoints = 0;
  for (const levelResult of gameResult) {
    if ((typeof levelResult !== `object`) || !(`time` in levelResult) || !(`isCorrect` in levelResult) || !Number.isInteger(levelResult.time) || (typeof levelResult.isCorrect !== `boolean`)) {
      return -1;
    }
    if (levelResult.isCorrect) {
      if ((levelResult.time >= GAME_RULES.costRange.slow[0]) && (levelResult.time <= GAME_RULES.costRange.slow[1])) {
        gamePoints += GAME_RULES.answerCost.slow;
      } else if ((levelResult.time >= GAME_RULES.costRange.normal[0]) && (levelResult.time <= GAME_RULES.costRange.normal[1])) {
        gamePoints += GAME_RULES.answerCost.normal;
      } else if ((levelResult.time >= GAME_RULES.costRange.quick[0]) && (levelResult.time <= GAME_RULES.costRange.quick[1])) {
        gamePoints += GAME_RULES.answerCost.quick;
      }
    }
  }
  return gamePoints + liveCounter * GAME_RULES.liveCost;
};

export default countGamePoints;
