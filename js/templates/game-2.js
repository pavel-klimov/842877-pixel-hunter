import getProgress from './progress';
import getElementFromTemplate from '../moduls/get-element-from-template';
import getGamePage from './game-page';
import changeContent from '../moduls/change-content';

const getGameTwoPage = function (game) {
  const question = game.questions[game.level];
  const template = getElementFromTemplate(`
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${question[0].src}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${getProgress(game)}
  </section>`);

  const form = template.querySelector(`.game__content`);

  form.addEventListener(`click`, (evt) => {
    const target = evt.target;
    if (target.classList.contains(`visually-hidden`)) {
      if (form.querySelector(`[name=question1]:checked`)) {
        let answer = {
          time: 15,
          answers: [
            {type: form.querySelector(`[name=question1]:checked`).value},
          ]
        };
        game.getAnswer(answer);
        changeContent(getGamePage(game));
      }
    }
  });

  return template;
};
export default getGameTwoPage;
