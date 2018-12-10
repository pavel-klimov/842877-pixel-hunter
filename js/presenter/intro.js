import IntroView from '../view/intro';
import Application from '../application';

export default class introPage {
  constructor() {
    this._introView = new IntroView();
    this._introView.onAsterickClick = () => {
      Application.showWelcome();
    };
  }
  get element() {
    return this._introView.element;
  }
}
