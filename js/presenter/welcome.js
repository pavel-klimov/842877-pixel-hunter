import HeaderView from '../view/header';
import GreetingView from '../view/greeting';
import RulesView from '../view/rules';
import Application from '../application';
import changeContent from '../moduls/change-content';

export default class WelcomePage {
  constructor() {
    this._view = new GreetingView();
    this._view.onContinueClick = () => {
      this.showRules();
    };
  }
  get element() {
    return this._view.element;
  }
  showRules() {
    const header = new HeaderView();
    header.onBackClick = () => {
      Application.showWelcome();
    };
    const content = new RulesView();
    content.onNameInput = () => {
      let form = document.querySelector(`.rules__form`);
      let submitButton = document.querySelector(`.rules__button`);
      submitButton.disabled = (form.checkValidity()) ? false : true;
    };
    content.onNameSubmit = (evt) => {
      evt.preventDefault();
      const form = document.querySelector(`.rules__form`);
      if (form.checkValidity()) {
        Application.showGame();
      }
    };
    const fragment = document.createDocumentFragment();
    fragment.appendChild(header.element);
    fragment.appendChild(content.element);
    this._view = fragment;
    changeContent(this._view);
  }
}
