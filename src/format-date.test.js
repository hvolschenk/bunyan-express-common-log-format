const formatDate = require('./format-date');

test('Formats a date with a timezone larger than zero', () => {
  const expected = '06/May/1986:17:10:22 +0000';

  const actual = formatDate(new Date('May 6, 1986 19:10:22 GMT+0200'));

  expect(actual).toBe(expected);
});

test('Formats a date with a timezone smaller than zero', () => {
  const expected = '06/May/1986:17:10:22 +0000';

  const actual = formatDate(new Date('May 6, 1986 15:10:22 GMT-0200'));

  expect(actual).toBe(expected);
});
