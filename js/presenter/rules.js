import HeaderView from '../view/header';
import RulesView from '../view/rules';
import Application from '../application';

export default class RulesPage {
  constructor() {
    this.header = new HeaderView();
    this.header.onBackClick = () => {
      Application.showWarning(Application.showWelcome);
    };
    this.content = new RulesView();
    this.content.onNameInput = (evt) => {
      this._name = evt.target.value;
      this.content.updateSubmitDisabled();
    };
    this.content.onNameSubmit = (evt) => {
      evt.preventDefault();
      if (evt.target.checkValidity()) {
        Application.showGame(this._name);
      }
    };
  }
  get element() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.header.element);
    fragment.appendChild(this.content.element);
    return fragment;
  }
}
