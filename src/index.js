const formatDate = require('./format-date');
const parseExpressOptions = require('./parse-express-options');

module.exports = ({ overrides, request, response, settings = {} }) => {
  const {
    authUser = '-',
    contentLength = '-',
    date,
    host = '-',
    httpVersion,
    ident = '-',
    method,
    statusCode = '-',
    url,
  } = parseExpressOptions({ request, response }, overrides);
  return `${host} ${ident} ${authUser} `
    + `[${formatDate(date, settings.dateFormat)}] "${method} ${url} `
    + `HTTP/${httpVersion}" ${statusCode} ${contentLength}`;
};
