const test = require('ava');

// const objectFilter = require('object-filter')
const objectFilter = require('../src/index');

test('should filter by property', (t) => {
  const obj = {
    a: { x: 10 },
    b: { c: { x: '100' } },
    d: { x: {}, e: 1000 },
    f: { g: { h: { x: [] } } },
    i: [{ j: 1, x: 2 }, { x: 3 }],
  };
  const expected = {
    a: {},
    b: { c: {} },
    d: { e: 1000 },
    f: { g: { h: {} } },
    i: [{ j: 1 }, {}],
  };
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
  const filter = (k, v) => v % 2;
  t.deepEqual(objectFilter(obj, filter), expected);
});

test('should not filter', (t) => {
  const object = { a: 1 };
  t.deepEqual(
    objectFilter(object, (k) => k !== 'x'),
    object,
  );
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
  t.deepEqual(objectFilter(object, Boolean.true), object);
});
