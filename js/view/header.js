import AbstractView from './abstract-view';

export default class GameOneView extends AbstractView {
  constructor(lives) {
    super();
    this.lives = lives;
  }

  get template() {
    let lives = `<div class="game__lives">`;
    const liveCounter = (this.lives >= 0) ? this.lives : 0;
    for (let i = 0; i < 3 - liveCounter; i++) {
      lives += `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`;
    }
    for (let i = 0; i < liveCounter; i++) {
      lives += `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;
    }
    lives += `</div>`;
    return `
    <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    <div class="game__timer">NN</div>
    ${lives}
  </header>`;
  }

  bind() {
    this.element.querySelector(`.back`).addEventListener(`click`, this.onBackClick);
  }

  onBackClick() {}
}
