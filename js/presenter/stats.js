import HeaderView from '../view/header';
import StatsView from '../view/stats';
import Application from '../application';

export default class StatsScreen {
  constructor(answers, lives, data) {
    this.answers = answers;
    this.lives = lives;
    this.data = data;
    this.header = new HeaderView();
    this.header.onBackClick = () => {
      Application.showWarning(Application.showWelcome);
    };
    this.content = new StatsView(this.answers, this.lives, this.data);
  }
  get element() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.header.element);
    fragment.appendChild(this.content.element);
    return fragment;
  }
}
