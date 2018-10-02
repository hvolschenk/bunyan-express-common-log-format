const dateFormat = require('dateformat');

const formatDate = date => dateFormat(date, 'dd/mmm/yyyy:hh:MM:ss o');

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
