const MOCK_PICNURE = {
  paintings: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};
const MIN_LEVEL_TYPE = 1;
const MAX_LEVEL_TYPE = 3;
const NUMBERS_OF_QUESTION = 10;
const getRandomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getLevel = function () {
  const images = [];
  const length = getRandomIntFromInterval(MIN_LEVEL_TYPE, MAX_LEVEL_TYPE);
  if (length === 1) {
    const number = getRandomIntFromInterval(0, MOCK_PICNURE.paintings.length - 1);
    images.push((getRandomIntFromInterval(0, 1) === 0) ? {src: MOCK_PICNURE.paintings[number], type: `paint`} : {src: MOCK_PICNURE.photos[number], type: `photo`});
  } else if (length === 2) {
    const number = getRandomIntFromInterval(0, MOCK_PICNURE.paintings.length - 1);
    const position = getRandomIntFromInterval(0, 1);
    images.push((position === 0) ? {src: MOCK_PICNURE.paintings[number], type: `paint`} : {src: MOCK_PICNURE.photos[number], type: `photo`});
    images.push((position === 0) ? {src: MOCK_PICNURE.photos[number], type: `photo`} : {src: MOCK_PICNURE.paintings[number], type: `paint`});
  } else {
    const number = getRandomIntFromInterval(0, MOCK_PICNURE.paintings.length - 1);
    for (let i = 0; i < MOCK_PICNURE.paintings.length; i++) {
      images.push((i === number) ? {src: MOCK_PICNURE.paintings[number], type: `paint`} : {src: MOCK_PICNURE.photos[number], type: `photo`});
    }
  }
  return images;
};
const getQuestions = function () {
  const questions = [];
  for (let i = 0; i < NUMBERS_OF_QUESTION; i++) {
    questions.push(getLevel());
  }
  return questions;
};

export default getQuestions;
