import introPage from './templates/intro';
import changeContent from './moduls/change-content';

// const PAGE_TEMPLATE_ID_ARRAY = [`intro`, `greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`, `modal-error`, `modal-confirm`];
// const LEFT_KEYCODE = 37;
// const RIGHT_KEYCODE = 39;

changeContent(introPage);

/*
let Screen = class {
  constructor() {
    this._correntPage = 0;
    this._numberOfScreens = PAGE_TEMPLATE_ID_ARRAY.length - 1;
    this._templateNode = PAGE_TEMPLATE_ID_ARRAY.map((name) => {
      return wrap(document.querySelector(`#${name}`));
    });
    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === LEFT_KEYCODE) {
        this.previousPage();
      }
      if (evt.keyCode === RIGHT_KEYCODE) {
        this.nextPage();
      }
    });
    this.changeContent(this._correntPage);
  }
  changeContent(number) {
    if (number > this._numberOfScreens) {
      this._correntPage = this._numberOfScreens;
    } else if (number < 0) {
      this._correntPage = 0;
    } else {
      this._correntPage = number;
    }
    document.querySelector(`#main`).innerHTML = ``;
    document.querySelector(`#main`).appendChild(this._templateNode[this._correntPage].cloneNode(true));
  }
  nextPage() {
    this._correntPage++;
    this.changeContent(this._correntPage);
  }
  previousPage() {
    this._correntPage--;
    this.changeContent(this._correntPage);
  }
};
let game = new Screen();
let arrowsElement = document.createElement(`div`);
arrowsElement.innerHTML = `
    <style>
      .arrows__wrap {
        position: absolute;
        top: 95px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>
  `;
arrowsElement.classList.add(`arrows__wrap`);
arrowsElement.querySelector(`.arrows__btn:first-of-type`).addEventListener(`click`, () => {
  game.previousPage();
});
arrowsElement.querySelector(`.arrows__btn:last-of-type`).addEventListener(`click`, () => {
  game.nextPage();
});
document.body.appendChild(arrowsElement);
*/
