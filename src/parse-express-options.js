module.exports = ({ request, response }, overrides = {}) => ({
  contentLength: response.get('Content-Length'),
  date: new Date(),
  host: request.headers.host,
  httpVersion: request.httpVersion,
  method: request.method,
  statusCode: response.statusCode,
  url: request.originalUrl,
  ...overrides,
});
