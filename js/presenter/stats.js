import HeaderView from '../view/header';
import StatsView from '../view/stats';
import Application from '../application';

export default class StatsScreen {
  constructor(answers, lives) {
    this.answers = answers;
    this.lives = lives;
    this.header = new HeaderView(this.lives);
    this.header.onBackClick = () => {
      Application.showWelcome();
    };
    this.content = new StatsView(this.answers, this.lives);
  }
  get element() {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(this.header.element);
    fragment.appendChild(this.content.element);
    return fragment;
  }
}
