import GreetingView from '../view/greeting';
import Application from '../application';

export default class WelcomePage {
  constructor() {
    this._view = new GreetingView();
    this._view.onContinueClick = () => {
      Application.showRules();
    };
  }
  get element() {
    return this._view.element;
  }
}
