const LEVEL_RANGE = [1, 10];

const changeLevel = function (counter = null) {
  if (counter < LEVEL_RANGE[0]) {
    return LEVEL_RANGE[0];
  } else if (counter > LEVEL_RANGE[1]) {
    return LEVEL_RANGE[1] + 1;
  }
  return counter + 1;
};

export default changeLevel;
