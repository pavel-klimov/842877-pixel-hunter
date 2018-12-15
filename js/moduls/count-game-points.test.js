import {assert} from 'chai';
import countGamePoints from './count-game-points';

const MOCK_ANSWERS_ARRAY = {
  min: {
    array: [
      {time: 1, isCorrect: true},
      {time: 2, isCorrect: true},
      {time: 3, isCorrect: true},
      {time: 4, isCorrect: true},
      {time: 5, isCorrect: true},
      {time: 6, isCorrect: true},
      {time: 7, isCorrect: true},
      {time: 8, isCorrect: true},
      {time: 9, isCorrect: true},
      {time: 10, isCorrect: true},
    ],
    result: 500
  },
  middle: {
    array: [
      {time: 11, isCorrect: true},
      {time: 12, isCorrect: true},
      {time: 13, isCorrect: true},
      {time: 14, isCorrect: true},
      {time: 15, isCorrect: true},
      {time: 16, isCorrect: true},
      {time: 17, isCorrect: true},
      {time: 18, isCorrect: true},
      {time: 19, isCorrect: true},
      {time: 20, isCorrect: true},
    ],
    result: 1000
  },
  max: {
    array: [
      {time: 21, isCorrect: true},
      {time: 22, isCorrect: true},
      {time: 23, isCorrect: true},
      {time: 24, isCorrect: true},
      {time: 25, isCorrect: true},
      {time: 26, isCorrect: true},
      {time: 27, isCorrect: true},
      {time: 28, isCorrect: true},
      {time: 29, isCorrect: true},
      {time: 30, isCorrect: true},
    ],
    result: 1500
  },
  allError: {
    array: [
      {time: 10, isCorrect: false},
      {time: 20, isCorrect: false},
      {time: 3, isCorrect: false},
      {time: 30, isCorrect: false},
      {time: 4, isCorrect: false},
      {time: 15, isCorrect: false},
      {time: 25, isCorrect: false},
      {time: 8, isCorrect: false},
      {time: 14, isCorrect: false},
      {time: 28, isCorrect: false},
    ],
    result: 0
  },
  mixed1: {
    array: [
      {time: 10, isCorrect: true},
      {time: 20, isCorrect: false},
      {time: 3, isCorrect: false},
      {time: 30, isCorrect: true},
      {time: 4, isCorrect: false},
      {time: 15, isCorrect: true},
      {time: 25, isCorrect: true},
      {time: 8, isCorrect: false},
      {time: 14, isCorrect: true},
      {time: 28, isCorrect: true},
    ],
    result: 700
  },
  mixed2: {
    array: [
      {time: 11, isCorrect: true},
      {time: 20, isCorrect: false},
      {time: 3, isCorrect: true},
      {time: 30, isCorrect: false},
      {time: 4, isCorrect: true},
      {time: 15, isCorrect: true},
      {time: 25, isCorrect: true},
      {time: 8, isCorrect: true},
      {time: 14, isCorrect: true},
      {time: 28, isCorrect: false},
    ],
    result: 600
  },
  tooShort: {
    array: [
      {time: 11, isCorrect: true},
      {time: 20, isCorrect: false},
      {time: 3, isCorrect: true},
      {time: 30, isCorrect: false},
      {time: 4, isCorrect: true},
    ],
    result: 200
  },
  tooLong: {
    array: [
      {time: 11, isCorrect: true},
      {time: 20, isCorrect: false},
      {time: 3, isCorrect: true},
      {time: 30, isCorrect: false},
      {time: 4, isCorrect: true},
      {time: 15, isCorrect: true},
      {time: 25, isCorrect: true},
      {time: 8, isCorrect: true},
      {time: 14, isCorrect: true},
      {time: 28, isCorrect: false},
      {time: 24, isCorrect: false},
      {time: 3, isCorrect: true},
      {time: 6, isCorrect: true},
      {time: 18, isCorrect: false},
      {time: 13, isCorrect: true},
      {time: 25, isCorrect: true},
    ],
    result: 950
  },
  errorInIsCorrect: {
    array: [
      {time: 11, isCorrect: `true`},
      {time: 20, isCorrect: 5},
      {time: 3, isCorrect: {isCorrect: true}},
      {time: 30, isCorrect: [false]},
      {time: 4, isCorrect: [true, true]},
      {time: 15, isCorrect: null},
      {time: 25, isCorrect: true},
      {time: 8, isCorrect: true},
      {time: 14, isCorrect: true},
    ],
    result: 600
  },
  errorInTime: {
    array: [
      {time: `11`, isCorrect: true},
      {time: [20], isCorrect: false},
      {time: {time: 3}, isCorrect: true},
      {time: true, isCorrect: false},
      {time: [4.4], isCorrect: true},
      {time: 15.6, isCorrect: true},
      {time: -25, isCorrect: true},
      {time: 8, isCorrect: true},
      {time: 14, isCorrect: true},
      {time: 28, isCorrect: false},
    ],
    result: 600
  }
};

describe(`countGamePoints - функция подсчёта результатов:`, () => {

  describe(`Простые случаи`, () => {
    it(`Правильно считает однородный контент (все верны и медленные, нормальные, быстрые)`, () => {
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.min.array, 1), MOCK_ANSWERS_ARRAY.min.result + 50);
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.max.array, 3), MOCK_ANSWERS_ARRAY.max.result + 150);
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.middle.array, 0), MOCK_ANSWERS_ARRAY.middle.result);
    });
    it(`Правильно считает смешанный контент`, () => {
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.mixed1.array, 2), MOCK_ANSWERS_ARRAY.mixed1.result + 100);
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.mixed2.array, 2), MOCK_ANSWERS_ARRAY.mixed2.result + 100);
    });
    it(`Если не достаточно ответов возвращает -1`, () => {
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.tooShort.array, 0), -1);
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.tooShort.array, 2), -1);
    });
  });

  describe(`При не полных параметрах`, () => {
    it(`Если нет двух параметров, возвращает -1`, () => {
      assert.equal(countGamePoints(), -1);
      assert.equal(countGamePoints(null), -1);
      assert.equal(countGamePoints(null, null), -1);
      assert.equal(countGamePoints(undefined, null), -1);
    });
    it(`Если нет первого параметра, возвращает -1`, () => {
      assert.equal(countGamePoints(undefined, 3), -1);
      assert.equal(countGamePoints(null, 3), -1);
    });
    it(`Если нет второго параметра, возвращает -1`, () => {
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.mixed1.array), -1);
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.mixed2.array, null), -1);
    });
  });

  describe(`Данные с ошибками`, () => {
    it(`Не стандартные данные которые нужно считать как обычно`, () => {
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.allError.array, 2), MOCK_ANSWERS_ARRAY.allError.result + 100);
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.tooLong.array, 2), MOCK_ANSWERS_ARRAY.tooLong.result + 100);
    });
    it(`При ошибке в первом параметре (структура объекта), возвращает -1`, () => {
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.errorInTime.array, 2), -1);
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.errorInIsCorrect.array, 2), -1);
      assert.equal(countGamePoints([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}], 2), -1);
      assert.equal(countGamePoints([{time: 4}, {time: 4}, {time: 4}, {time: 4}, {time: 4}, {time: 4}, {time: 4}, {time: 4}, {time: 4}, {time: 4}], 2), -1);
      assert.equal(countGamePoints([{isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: true}], 2), -1);
    });
    it(`При ошибке в первом параметре (тип данных), возвращает -1`, () => {
      assert.equal(countGamePoints(`Array`, 2), -1);
      assert.equal(countGamePoints([`Array1`, `Array2`, `Array3`, `Array4`, `Array5`, `Array6`, `Array7`, `Array8`, `Array9`, `Array0`], 2), -1);
      assert.equal(countGamePoints([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 2), -1);
      assert.equal(countGamePoints([[], [], [], [], [], [], [], [], [], []], 2), -1);
    });
    it(`При ошибке во втором параметре, возвращает -1`, () => {
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.mixed1.array, -1), -1);
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.mixed1.array, [2]), -1);
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.mixed1.array, {liveCount: 2}), -1);
      assert.equal(countGamePoints(MOCK_ANSWERS_ARRAY.mixed1.array, `2`), -1);
    });
  });

});
