const getProgress = function (game) {
  let answers = ``;
  for (let i = 0; i < 10; i++) {
    if (!game.answers[i]) {
      answers += `<li class="stats__result stats__result--unknown"></li>`;
    } else if (!game.answers[i].isCorrect) {
      answers += `<li class="stats__result stats__result--wrong"></li>`;
    } else if (game.answers[i].time <= 10) {
      answers += `<li class="stats__result stats__result--slow"></li>`;
    } else if (game.answers[i].time > 20) {
      answers += `<li class="stats__result stats__result--fast"></li>`;
    } else {
      answers += `<li class="stats__result stats__result--correct"></li>`;
    }
  }
  const template = `<ul class="stats">
    ${answers}
  </ul>`;
  return template;
};

export default getProgress;
