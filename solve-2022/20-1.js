// Part 1

const data = input;

const parseData = (data) => {
  const numbers = [];
  const dataset = data.split('\n').map(Number);
  for (const [id, n] of dataset.entries()) {
    numbers.push({
      value: n,
      position: id
    });
  }
  return numbers;
};

const getNextPosition = ({ value, position }) => {
  const numbersLength = numbers.length - 1;
  const next = (((value + position) % numbersLength) + numbersLength) % numbersLength;
  if (value >= 0) {
    return next;
  }
  return (next === 0) ? numbersLength : next;
};

const mix = () => {
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    const currentPosition = number.position;
    const nextPosition = getNextPosition(number);
    if (currentPosition === nextPosition) {
      continue;
    }
    const min = Math.min(currentPosition, nextPosition);
    const max = Math.max(currentPosition, nextPosition);
    for (let j = 0; j < numbers.length; j++) {
      const next = numbers[j];
      if (i === j) {
        number.position = nextPosition;
      } else if (next.position >= min && next.position <= max) {
        next.position += Math.sign(currentPosition - nextPosition);
      }
    }
  }
  return [...numbers.values()].sort((a, b) => a.position - b.position).map((n) => n.value);
};

const numbers = parseData(data);
const mixedNumbers = mix();
const indexZero = mixedNumbers.indexOf(0);
let sum = 0;
sum += mixedNumbers[(indexZero + 1000) % mixedNumbers.length];
sum += mixedNumbers[(indexZero + 2000) % mixedNumbers.length];
sum += mixedNumbers[(indexZero + 3000) % mixedNumbers.length];

answer = sum;
