const wrap = (it) => {
  const shadow = document.createDocumentFragment();
  const content = it.content.cloneNode(true);
  shadow.appendChild(content);
  return shadow.cloneNode(true);
};

const getElementFromTemplate = function (templateString) {
  let template = document.createElement(`template`);
  template.innerHTML = templateString.trim();
  return wrap(template);
};

export default getElementFromTemplate;
