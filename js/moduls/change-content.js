const changeContent = function (newPage, selector = `#main`) {
  const main = document.querySelector(selector);
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  main.appendChild(newPage);
};

export default changeContent;
