import IntroView from '../view/intro';

export default class IntroScreen {
  constructor() {
    this._introView = new IntroView();
  }
  get element() {
    return this._introView.element;
  }
}
