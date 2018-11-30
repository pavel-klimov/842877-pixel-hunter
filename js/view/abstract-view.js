const wrap = (it) => {
  const shadow = document.createDocumentFragment();
  const content = it.content.cloneNode(true);
  shadow.appendChild(content);
  return shadow.cloneNode(true);
};

const AbstractView = class {
  get template() {}
  bind() {}
  static render() {
    let template = document.createElement(`template`);
    template.innerHTML = this.template.trim();
    return wrap(template);
  }
  get element() {
    if (!this.element) {
      this.element = this.render();
      this.bind();
    }
    return this.element;
  }
};

export default AbstractView;
