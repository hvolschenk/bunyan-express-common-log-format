const dateformat = require('dateformat');

module.exports = (date, format = 'dd/mmm/yyyy:hh:MM:ss o') => dateformat(date, format);
