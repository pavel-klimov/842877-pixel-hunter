import ErrorView from '../view/error';

export default class ErrorScreen {
  constructor(error) {
    this._errorView = new ErrorView(error);
  }
  get element() {
    return this._errorView.element;
  }
}
