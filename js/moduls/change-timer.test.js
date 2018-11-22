import {assert} from 'chai';
import changeTimer from './change-timer';

describe(`changeTimer - функция изменения таймера:`, () => {

  it(`Простые случаи`, () => {
    assert.equal(changeTimer(30), 29);
    assert.equal(changeTimer(20), 19);
    assert.equal(changeTimer(10), 9);
    assert.equal(changeTimer(1), 0);
  });

  it(`Не достаточно данных`, () => {
    assert.equal(changeTimer(), 0);
    assert.equal(changeTimer(null), 0);
  });

  it(`Данные с ошибками`, () => {
    assert.equal(changeTimer(60), 29);
    assert.equal(changeTimer(100), 29);
    assert.equal(changeTimer(0), 0);
    assert.equal(changeTimer(-10), 0);
  });

});
