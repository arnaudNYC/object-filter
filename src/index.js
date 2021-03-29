/**
 *
 *  Returns a new object containing all elements of the calling object for which the provided filter callback returns true
 *
 * @param {object} object to filter
 * @param {function} filter function
 */
function objectFilter(object, filter) {
  if (Array.isArray(object)) {
    return object.map((o) => objectFilter(o, filter));
  }
  if (typeof object === 'object' && object !== null) {
    return Object.keys(object).reduce((acc, key) => {
      if (filter(key, object[key])) {
        acc[key] = objectFilter(object[key], filter);
      }
      return acc;
    }, {});
  }
  return object;
}

module.exports = (object, filter) => {
  const oneArg = object && filter;
  if (oneArg === undefined || oneArg === null) {
    return object;
  }
  return objectFilter(object, filter);
};
