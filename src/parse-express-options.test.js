const parseExpressOptions = require('./parse-express-options');

const Date = jest.fn();
const get = jest.fn();
const CONTENT_LENGTH = 'CONTENT_LENGTH';
const DATE = 'DATE';
const HOST = 'HOST';
const HTTP_VERSION = 'HTTP_VERSION';
const METHOD = 'METHOD';
const ORIGINAL_URL = 'ORIGINAL_URL';
const STATUS_CODE = 'STATUS_CODE';
const request = {
  headers: { host: HOST },
  httpVersion: HTTP_VERSION,
  method: METHOD,
  originalUrl: ORIGINAL_URL,
};
const response = { get, statusCode: STATUS_CODE };

beforeAll(() => {
  Date.mockImplementation(() => ({ date: DATE }));
  get.mockReturnValue(CONTENT_LENGTH);
  global.Date = Date;
});

test('Parses the given options properly without overrides', () => {
  const expectedGet = 'Content-Length';
  const expectedParsed = {
    contentLength: CONTENT_LENGTH,
    date: { date: DATE },
    host: HOST,
    httpVersion: HTTP_VERSION,
    method: METHOD,
    statusCode: STATUS_CODE,
    url: ORIGINAL_URL,
  };

  const actualParsed = parseExpressOptions({ request, response });
  const actualGet = get.mock.calls[0][0];

  expect(actualGet).toEqual(expectedGet);
  expect(actualParsed).toEqual(expectedParsed);
});

test('Parses the given options properly with overrides', () => {
  const CONTENT_LENGTH_OVERRIDE = 'CONTENT_LENGTH_OVERRIDE';
  const IDENT_OVERRIDE = 'IDENT_OVERRIDE';
  const overrides = { contentLength: CONTENT_LENGTH_OVERRIDE, ident: IDENT_OVERRIDE };
  const expected = {
    contentLength: CONTENT_LENGTH_OVERRIDE,
    date: { date: DATE },
    host: HOST,
    httpVersion: HTTP_VERSION,
    ident: IDENT_OVERRIDE,
    method: METHOD,
    statusCode: STATUS_CODE,
    url: ORIGINAL_URL,
  };

  const actual = parseExpressOptions({ request, response }, overrides);

  expect(actual).toEqual(expected);
});
