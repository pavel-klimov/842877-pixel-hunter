const TIME_TO_ANIMATION = 500;

const crossfadeContent = function (newPage, oldContentSelector = `.intro`, selector = `#main`) {
  const main = document.querySelector(selector);
  const toRemove = document.querySelector(oldContentSelector);
  toRemove.classList.add(`crossfade`);
  main.appendChild(newPage);
  setTimeout(() => {
    main.removeChild(toRemove);
  }, TIME_TO_ANIMATION);
};

export default crossfadeContent;
