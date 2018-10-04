test('Adds default values for all except \'date\' \'httpVersion\', \'method\' and \'url\'', () => {
  const DATE = 'DATE';
  const FORMATTED_DATE = 'FORMATTED_DATE';
  const HTTP_VERSION = 'HTTP_VERSION';
  const METHOD = 'METHOD';
  const OVERRIDES = 'OVERRIDES';
  const REQUEST = 'REQUEST';
  const RESPONSE = 'RESPONSE';
  const URL = 'URL';
  const mockFormatDate = jest.fn();
  const mockParseExpressOptions = jest.fn();
  jest.doMock('./format-date', () => mockFormatDate);
  jest.doMock('./parse-express-options', () => mockParseExpressOptions);
  mockFormatDate.mockReturnValue(FORMATTED_DATE);
  mockParseExpressOptions.mockReturnValue({
    date: DATE,
    httpVersion: HTTP_VERSION,
    method: METHOD,
    url: URL,
  });
  const expectedFormatDateOne = DATE;
  const expectedFormatDateTwo = undefined;
  const expectedLog = `- - - [${FORMATTED_DATE}] "${METHOD} ${URL} HTTP/${HTTP_VERSION}" - -`;
  const expectedParseExpressOptionsOne = { request: REQUEST, response: RESPONSE };
  const expectedParseExpressOptionsTwo = OVERRIDES;

  // eslint-disable-next-line global-require
  const response = require('./index');
  const actualLog = response({ overrides: OVERRIDES, request: REQUEST, response: RESPONSE });
  const formatDateCall = mockFormatDate.mock.calls[0];
  const parseExpressOptionsCall = mockParseExpressOptions.mock.calls[0];
  const actualFormatDateOne = formatDateCall[0];
  const actualFormatDateTwo = formatDateCall[1];
  const actualParseExpressOptionsOne = parseExpressOptionsCall[0];
  const actualParseExpressOptionsTwo = parseExpressOptionsCall[1];

  expect(actualLog).toBe(expectedLog);
  expect(actualFormatDateOne).toBe(expectedFormatDateOne);
  expect(actualFormatDateTwo).toBe(expectedFormatDateTwo);
  expect(actualParseExpressOptionsOne).toEqual(expectedParseExpressOptionsOne);
  expect(actualParseExpressOptionsTwo).toBe(expectedParseExpressOptionsTwo);
});

test('Adds values for all fields and overrides the date format', () => {
  const AUTH_USER = 'AUTH_USER';
  const CONTENT_LENGTH = 'CONTENT_LENGTH';
  const DATE = 'DATE';
  const DATE_FORMAT = 'DATE_FORMAT';
  const FORMATTED_DATE = 'FORMATTED_DATE';
  const HOST = 'HOST';
  const HTTP_VERSION = 'HTTP_VERSION';
  const IDENT = 'IDENT';
  const METHOD = 'METHOD';
  const REQUEST = 'REQUEST';
  const RESPONSE = 'RESPONSE';
  const STATUS_CODE = 'STATUS_CODE';
  const URL = 'URL';
  const mockFormatDate = jest.fn();
  const mockParseExpressOptions = jest.fn();
  jest.doMock('./format-date', () => mockFormatDate);
  jest.doMock('./parse-express-options', () => mockParseExpressOptions);
  mockFormatDate.mockReturnValue(FORMATTED_DATE);
  mockParseExpressOptions.mockReturnValue({
    authUser: AUTH_USER,
    contentLength: CONTENT_LENGTH,
    date: DATE,
    host: HOST,
    httpVersion: HTTP_VERSION,
    ident: IDENT,
    method: METHOD,
    statusCode: STATUS_CODE,
    url: URL,
  });
  const expectedFormatDateOne = DATE;
  const expectedFormatDateTwo = DATE_FORMAT;
  const expectedLog = `${HOST} ${IDENT} ${AUTH_USER} [${FORMATTED_DATE}] `
    + `"${METHOD} ${URL} HTTP/${HTTP_VERSION}" ${STATUS_CODE} ${CONTENT_LENGTH}`;

  jest.resetModules();
  // eslint-disable-next-line global-require
  const response = require('./index');
  const actualLog = response({
    request: REQUEST,
    response: RESPONSE,
    settings: { dateFormat: DATE_FORMAT },
  });
  const formatDateCall = mockFormatDate.mock.calls[0];
  const actualFormatDateOne = formatDateCall[0];
  const actualFormatDateTwo = formatDateCall[1];

  expect(actualLog).toBe(expectedLog);
  expect(actualFormatDateOne).toBe(expectedFormatDateOne);
  expect(actualFormatDateTwo).toBe(expectedFormatDateTwo);
});
