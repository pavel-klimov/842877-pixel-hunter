const TIMER_RANGE = [1, 30];

const changeTimer = function (counter = TIMER_RANGE[0]) {
  if (counter < TIMER_RANGE[0]) {
    return TIMER_RANGE[0] - 1;
  } else if (counter > TIMER_RANGE[1]) {
    return TIMER_RANGE[1] - 1;
  }
  return counter - 1;
};

export default changeTimer;
