import WarningView from '../view/warning';

export default class WarningScreen {
  constructor(onConfirmeCallback = () => {}, onCancelCallback = () => {}) {
    this._warningView = new WarningView();
    this._warningView.onConfirme = (evt) => {
      evt.preventDefault();
      onConfirmeCallback();
    };
    this._warningView.onCancel = (evt) => {
      evt.preventDefault();
      this._warningView.removeModal();
      onCancelCallback();
    };
  }
  get element() {
    return this._warningView.element;
  }

}
