# Object Filter

[![Coverage Status](https://coveralls.io/repos/github/arnaudNYC/object-filter/badge.svg?branch=master)](https://coveralls.io/github/arnaudNYC/object-filter?branch=master)

Returns a new object containing all elements of the calling object for which the provided filter callback returns true.

Like [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) but for objects.

This project has no dependencies.

## Installation

### npm

`npm install @arnaudnyc/object-filter`

### yarn

`yarn add @arnaudnyc/object-filter`

## Usage

```
const objectFilter = require('@arnaudnyc/object-filter');

const object = {
  keep: 'yes',
  discard: 'no',
};

const filteredByProperty = objectFilter(object, property => property === 'keep');
console.log('filteredByProperty: ', filteredByProperty); // filteredByProperty:  { keep: 'yes' }

const filteredByValue = objectFilter(object, (property, value) => value === 'yes');
console.log('filteredByValue: ', filteredByValue); // filteredByValue:  { keep: 'yes' }
```

## Testing

`npm test` or `yarn test`

## Credits

Made with ❤️ in 🗽

## License

[MIT](./LICENSE)
