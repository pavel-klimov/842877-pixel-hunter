const LIVE_RANGE = [0, 3];

const changeLiveCounter = function (counter = LIVE_RANGE[0]) {
  if (counter < LIVE_RANGE[0]) {
    return LIVE_RANGE[0] - 1;
  } else if (counter > LIVE_RANGE[1]) {
    return LIVE_RANGE[1] - 1;
  }
  return counter - 1;
};

export default changeLiveCounter;
