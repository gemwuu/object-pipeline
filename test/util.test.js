const assert = require('assert');
const { type, isFn } = require('../build/util');

describe('type', () => {
  it('Array', () => {
    assert.strictEqual(type([]), 'array');
  });
  it('Object', () => {
    assert.strictEqual(type({}), 'object');
  });
  it('Date', () => {
    assert.strictEqual(type(new Date()), 'date');
  });
  it('RegExp', () => {
    assert.strictEqual(type(new RegExp('aaa')), 'regexp');
  });
  it('Number', () => {
    assert.strictEqual(type(11), 'number');
    assert.strictEqual(type(Infinity), 'number');
    assert.strictEqual(type(NaN), 'number');
  });
  it('Symbol', () => {
    assert.strictEqual(type(Symbol()), 'symbol');
  });
  it('String', () => {
    assert.strictEqual(type('aa'), 'string');
  });
  it('Boolean', () => {
    assert.strictEqual(type(false), 'boolean');
    assert.strictEqual(type(true), 'boolean');
  });
  it('null', () => {
    assert.strictEqual(type(null), 'null');
  });
  it('undefined', () => {
    assert.strictEqual(type(undefined), 'undefined');
  });
  it('Map', () => {
    assert.strictEqual(type(new Map()), 'map');
  });
  it('Set', () => {
    assert.strictEqual(type(new Set()), 'set');
  });
});

describe('isFn', () => {
  it('true', () => {
    assert.strictEqual(isFn(function() {}), true);
  });

  it('false', () => {
    assert.strictEqual(isFn('a'), false);
  });
});

