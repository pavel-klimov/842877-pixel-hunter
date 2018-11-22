import {assert} from 'chai';
import changeLiveCounter from './change-live-counter';

describe(`changeLiveCounter - функция изменения колличества жизней:`, () => {

  it(`Простые случаи`, () => {
    assert.equal(changeLiveCounter(3), 2);
    assert.equal(changeLiveCounter(2), 1);
    assert.equal(changeLiveCounter(1), 0);
    assert.equal(changeLiveCounter(0), -1);
  });

  it(`Не достаточно данных`, () => {
    assert.equal(changeLiveCounter(), -1);
    assert.equal(changeLiveCounter(null), -1);
  });

  it(`Данные с ошибками`, () => {
    assert.equal(changeLiveCounter(6), 2);
    assert.equal(changeLiveCounter(10), 2);
    assert.equal(changeLiveCounter(-1), -1);
    assert.equal(changeLiveCounter(-10), -1);
  });

});
