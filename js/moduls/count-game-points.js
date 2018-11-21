const GAME_RULES = {
  answerCost: {
    slow: 50,
    normal: 100,
    quick: 150
  },
  costRange: {
    slow: [1, 10],
    normal: [11, 20],
    quick: [21, 30]
  },
  liveCost: 50,
  questionCounters: 10
};

const countGamePoints = function (gameResult = null, liveCounter = null) {
  if (!gameResult || !Array.isArray(gameResult) || (gameResult.length < GAME_RULES.questionCounters) || !Number.isInteger(liveCounter) || (liveCounter < 0)) {
    return -1;
  }
  let gamePoints = 0;
  for (let i = 0; i < GAME_RULES.questionCounters; i++) {
    if ((typeof gameResult[i] !== `object`) || !(`time` in gameResult[i]) || !(`isCorrect` in gameResult[i]) || !Number.isInteger(gameResult[i].time) || (typeof gameResult[i].isCorrect !== `boolean`)) {
      return -1;
    }
    if (gameResult[i].isCorrect) {
      if ((gameResult[i].time >= GAME_RULES.costRange.slow[0]) && (gameResult[i].time <= GAME_RULES.costRange.slow[1])) {
        gamePoints += GAME_RULES.answerCost.slow;
      } else if ((gameResult[i].time >= GAME_RULES.costRange.normal[0]) && (gameResult[i].time <= GAME_RULES.costRange.normal[1])) {
        gamePoints += GAME_RULES.answerCost.normal;
      } else if ((gameResult[i].time >= GAME_RULES.costRange.quick[0]) && (gameResult[i].time <= GAME_RULES.costRange.quick[1])) {
        gamePoints += GAME_RULES.answerCost.quick;
      }
    }
  }
  return gamePoints + liveCounter * GAME_RULES.liveCost;
};

export default countGamePoints;
