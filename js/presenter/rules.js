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
    this.content.onNameInput = () => {
      const form = document.querySelector(`.rules__form`);
      const submitButton = document.querySelector(`.rules__button`);
      submitButton.disabled = (form.checkValidity()) ? false : true;
    };
    this.content.onNameSubmit = (evt) => {
      evt.preventDefault();
      const form = document.querySelector(`.rules__form`);
      const nameInput = form.querySelector(`.rules__input`);
      if (form.checkValidity()) {
        Application.showGame(nameInput.value);
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
