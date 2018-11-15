const changeContent = function (newPage) {
  const main = document.querySelector(`#main`);
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  main.appendChild(newPage);
};

export default changeContent;
