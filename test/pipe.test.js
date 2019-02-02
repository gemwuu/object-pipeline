'use strict';
/**
 * @author: tianding.wk
 * @createdTime: 2019-02-02 17:37:06
 * @fileName: pipe.test.js
 * @description:
 **/

const assert = require('assert');
const { pipeline } = require('../src/pipeline');


describe('corner cases', () => {
  describe('pipeline(obj, "foo", fn)', () => {
    it('error, obj invalid: `""`', () => {
      assert(pipeline('', 'foo', item => ++item) === '', true);
    });

    it('error, obj invalid: `null`', () => {
      assert(pipeline(null, 'foo', item => ++item) === null, true);
    });

    it('error, fn invalid', () => {
      assert.deepEqual(pipeline({ foo: 1 }, 'foo', null), { foo: 1 });
    });
  });

  describe('pipeline(obj, [{foo: fn1}], fn0)', () => {
    it('error, fn0 invalid', () => {
      assert.deepEqual(pipeline({ foo: 1 }, [{ foo: item => ++item }], null), { foo: 2 });
    });
    it('error, fn1 invalid', () => {
      assert.deepEqual(pipeline({ foo: 1 }, [{ foo: null }], item => ++item), { foo: 2 });
    });
    it('error, fn0 and fn1 invalid', () => {
      assert.deepEqual(pipeline({ foo: 1 }, [{ foo: null }], null), { foo: 1 });
    });
  });

  describe('pipeline(obj, { foo: fn1 }, fn0)', () => {
    it('error, fn0 invalid', () => {
      assert.deepEqual(pipeline({ foo: 1 }, { foo: null }, null), { foo: 1 });
    });
    it('error, fn1 invalid', () => {
      assert.deepEqual(pipeline({ foo: 1 }, { foo: null }, item => ++item), { foo: 2 });
    });
    it('error, fn0 and fn1 invalid', () => {
      assert.deepEqual(pipeline({ foo: 1 }, { foo: null }, null), { foo: 1 });
    });
  });

  describe('pipeline(obj, () => {}, null)', () => {
    it('default', () => {
      assert.deepEqual(pipeline({ foo: 1 }, null, null), { foo: 1 });
    });
  });
});


describe('pipeline(obj, "foo", fn)', () => {
  it('success', () => {
    assert.deepEqual(pipeline({ foo: 1 }, 'foo', item => ++item), { foo: 2 });
  });

  it('success, not processed', () => {
    assert.deepEqual(pipeline({ foo: 1 }, 'xxx', item => ++item), { foo: 1 });
  });


});

describe('pipeline(obj, [ "foo" ], fn)', () => {
  it('succss, array contains string only', () => {
    assert.deepEqual(pipeline({ foo: 1 }, ['foo'], item => ++item), { foo: 2 });
  });

  it('succss, array contains string and object', () => {
    assert.deepEqual(pipeline(
      { foo: 1, bar: 2 },
      [ 'foo', { bar: item => --item } ],
      item => ++item
    ), { foo: 2, bar: 1 });
  });
});

describe('pipeline(obj, { foo: item => ++item }, fn)', () => {
  it('success', () => {
    assert.deepEqual(pipeline({ foo: 1, bar: 2 }, { foo: item => --item, xxx: item => ++item }), { foo: 0, bar: 2 });
  })
});
