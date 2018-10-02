const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const addZero = number => (number < 10 ? `0${number}` : number);

module.exports = date =>
  `${addZero(date.getDate())}/${monthNames[date.getMonth()]}/${date.getFullYear()}:`
  + `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())} +0000`;
