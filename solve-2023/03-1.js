// Part 1

const parseInput = () => input.split('\n');

const extractNumbers = (lines) => {
  const regex = /(\d+)/g;
  const numbers = [];
  for (const [index, line] of lines.entries()) {
    let m;
    while ((m = regex.exec(line)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      numbers.push({
        v: Number(m[1]), // value
        l: m[1].length, // length
        x: index, // pos. x
        y: m.index // pos. y
      });
    }
  }
  return numbers;
};

const isSymbol = (char) => char !== '.' && !(/\d/.test(char));

const hasAdjacentSymbol = (number, input) => {
  const iMin = Math.max(number.x - 1, 0);
  const iMax = Math.min(number.x + 1, input.length - 1); // H
  const jMin = Math.max(number.y - 1, 0);
  const jMax = Math.min(number.y + number.l, input[0].length - 1); // W
  for (let i = iMin; i <= iMax; i++) { // x line
    for (let j = jMin; j <= jMax; j++) { // y row
      if (isSymbol(input[i][j])) {
        return true;
      }
    }
  }
  return false;
};

const main = () => {
  const input = parseInput();
  const numbers = extractNumbers(input);
  let sum = 0;
  for (const number of numbers) {
    if (hasAdjacentSymbol(number, input)) {
      sum += number.v;
    }
  }
  return sum;
};

answer = main(); // 531932
