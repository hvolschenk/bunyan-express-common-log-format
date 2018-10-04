test('Formats a date with the default format', () => {
  const DATE = 'DATE';
  const mockDateFormat = jest.fn();
  jest.doMock('dateformat', () => mockDateFormat);
  const expectedOne = DATE;
  const expectedTwo = 'dd/mmm/yyyy:hh:MM:ss o';

  // eslint-disable-next-line global-require
  const formatDate = require('./format-date');
  formatDate(DATE);
  const dateformatCall = mockDateFormat.mock.calls[0];
  const actualOne = dateformatCall[0];
  const actualTwo = dateformatCall[1];

  expect(actualOne).toBe(expectedOne);
  expect(actualTwo).toBe(expectedTwo);
});

test('Formats a date with a custom format', () => {
  const DATE = 'DATE';
  const DATE_FORMAT = 'DATE_FORMAT';
  const mockDateFormat = jest.fn();
  jest.doMock('dateformat', () => mockDateFormat);
  const expectedOne = DATE;
  const expectedTwo = DATE_FORMAT;

  jest.resetModules();
  // eslint-disable-next-line global-require
  const formatDate = require('./format-date');
  formatDate(DATE, DATE_FORMAT);
  const dateformatCall = mockDateFormat.mock.calls[0];
  const actualOne = dateformatCall[0];
  const actualTwo = dateformatCall[1];

  expect(actualOne).toBe(expectedOne);
  expect(actualTwo).toBe(expectedTwo);
});
