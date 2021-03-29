const test = require('ava');

const objectFilter = require('../src');

test('should filter by property', (t) => {
  const obj = {
    a: { x: 10 },
    b: { c: { x: '100' } },
    d: { x: {}, e: 1000 },
    f: { g: { h: { x: [] } } },
    i: [{ j: 1, x: 2 }, { x: 3 }],
    k: [{ x: 1 }],
  };
  const expected = {
    a: {},
    b: { c: {} },
    d: { e: 1000 },
    f: { g: { h: {} } },
    i: [{ j: 1 }, {}],
    k: [{}],
  };
  // remove all the 'x' properties
  const actual = objectFilter(obj, (k) => k !== 'x');
  t.deepEqual(actual, expected);
});

test('should filter by value', (t) => {
  const obj = {
    keep: 1,
    discard: 2,
  };
  const expected = {
    keep: 1,
  };
  const filter = (k, v) => v === 1;
  t.deepEqual(objectFilter(obj, filter), expected);
});

test('should not filter', (t) => {
  const object = { a: 1 };
  const filter = (k) => k !== 'x';
  t.deepEqual(objectFilter(object, filter), object);
});

test('should filter a circular object', (t) => {
  const obj = { a: 1 };
  obj.x = { x: obj };
  const expected = { a: 1 };
  const actual = objectFilter(obj, (k) => k !== 'x');
  t.deepEqual(actual, expected);
});

test('should accept non object types', (t) => {
  t.is(objectFilter(null), null);
  t.is(objectFilter(undefined), undefined);
  t.is(objectFilter(1), 1);
  t.is(objectFilter(''), '');
});

test('should accept non function filters', (t) => {
  const object = { a: 1 };
  t.deepEqual(objectFilter(object, null), object);
  t.deepEqual(objectFilter(object, undefined), object);
  t.deepEqual(objectFilter(object, Boolean), object);
});

test('should handle null and undefined keys and values', (t) => {
  const object = {
    isNull: null,
    isUndefined: undefined,
    undefined: 'undefined',
    null: 'null',
  };
  t.deepEqual(objectFilter(object, Boolean), object);
});
