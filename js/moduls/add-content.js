const addContent = function (newPage, selector = `#main`) {
  const main = document.querySelector(selector);
  main.appendChild(newPage);
};

export default addContent;
