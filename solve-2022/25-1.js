// Part 1

exampleAnswer = '2=-1=0';
const data = MODE_DEV ? example : input;

const snafuDict = {
  '-2': '=', '-1': '-', '0': '0', '1': '1', '2': '2'
};

const parseData = (data) => {
  const snafuNumbers = [];
  for (const n of data.split('\n')) {
    snafuNumbers.push(n);
  }
  return snafuNumbers;
};

const snafuToDecimal = (number) => number.split('').reverse().map((v) => {
  if (v === '-') {
    return -1;
  } else if (v === '=') {
    return -2;
  }
  return Number(v);
}).map((v, i) => v * Math.pow(5, i)).reduce((acc, value) => acc + value, 0);

const decimalToSnafu = (number) => {
  if (number === -2) {
    return '=';
  }
  if (number === -1) {
    return '-';
  }
  if (number === 0) {
    return '0';
  }
  const result = [];
  while (number > 0) {
    const mod = ((number + 2) % 5) - 2;
    result.push(snafuDict[mod]);
    number = Math.round(number / 5);
  }
  return result.reverse().join('');
};

const snafuNumbers = parseData(data);
const numbers = [];
for (const snafuNumber of snafuNumbers) {
  numbers.push(snafuToDecimal(snafuNumber));
}
const sum = numbers.reduce((acc, value) => acc + value, 0);
console.warn({ sum });
answer = decimalToSnafu(sum);
