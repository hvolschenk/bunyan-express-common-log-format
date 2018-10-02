const dateFormat = require('dateformat');

const response = require('./index');

test('Adds a default value for everything except \'httpVersion\', \'method\' and \'url\'', () => {
  const HTTP_VERSION = 'HTTP_VERSION';
  const METHOD = 'METHOD';
  const URL = 'URL';
  const expected = `- - - [-] "${METHOD} ${URL} HTTP/${HTTP_VERSION}" - -`;

  const actual = response({ httpVersion: HTTP_VERSION, method: METHOD, url: URL });

  expect(actual).toBe(expected);
});

test('Adds all values to the serializer properly', () => {
  const AUTH_USER = 'AUTH_USER';
  const CONTENT_LENGTH = 'CONTENT_LENGTH';
  const DATE = new Date('May 6, 1986 19:10:22 GMT+0200');
  const HOST = 'HOST';
  const HTTP_VERSION = 'HTTP_VERSION';
  const IDENT = 'IDENT';
  const METHOD = 'METHOD';
  const STATUS_CODE = 'STATUS_CODE';
  const URL = 'URL';
  const expected = `${HOST} ${IDENT} ${AUTH_USER} [${dateFormat(DATE, 'dd/mmm/yyyy:hh:MM:ss o')}] `
    + `"${METHOD} ${URL} HTTP/${HTTP_VERSION}" ${STATUS_CODE} ${CONTENT_LENGTH}`;

  const actual = response({
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

  expect(actual).toBe(expected);
});
