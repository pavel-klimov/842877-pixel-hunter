import {assert} from 'chai';
import changeLevel from './change-level';

describe(`changeLevel - функция изменения уровня:`, () => {

  it(`Простые случаи`, () => {
    assert.equal(changeLevel(1), 2);
    assert.equal(changeLevel(3), 4);
    assert.equal(changeLevel(9), 10);
    assert.equal(changeLevel(10), 11);
  });

  it(`Не достаточно данных`, () => {
    assert.equal(changeLevel(), 1);
    assert.equal(changeLevel(null), 1);
  });

  it(`Данные с ошибками`, () => {
    assert.equal(changeLevel(16), 11);
    assert.equal(changeLevel(100), 11);
    assert.equal(changeLevel(-1), 1);
    assert.equal(changeLevel(-10), 1);
  });

});
