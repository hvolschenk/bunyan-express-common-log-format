const formatDate = require('./format-date');

module.exports = ({
  authUser = '-',
  contentLength = '-',
  date = '-',
  host = '-',
  httpVersion,
  ident = '-',
  method,
  statusCode = '-',
  url,
}) => `${host} ${ident} ${authUser} [${date === '-' ? '-' : formatDate(date)}] "${method} ${url} `
  + `HTTP/${httpVersion}" ${statusCode} ${contentLength}`;
