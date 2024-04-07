// Part 2

const parseInput = () => input.split('\n');

const extractNumbers = (lines) => {
  const regex = /(\d+)/g;
  const numbers = [];
  for (const [index, line] of lines.entries()) {
    console.log(index, line);
    let m = regex.exec(line);
    while (m !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      numbers.push({
        v: Number(m[1]), // value
        l: m[1].length, // length
        x: index, // pos. x
        y: m.index, // pos. y
      });
      m = regex.exec(line);
    }
  }
  return numbers;
};

const extractGears = (lines) => {
  const regex = /(\*)/g;
  const gears = [];
  for (const [index, line] of lines.entries()) {
    let m = regex.exec(line);
    while (m !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      gears.push({
        x: index, // pos. x
        y: m.index, // pos. y
      });
      m = regex.exec(line);
    }
  }
  return gears;
};

const isBetween = (n, min, max) => n >= min && n <= max;

const getAdjacentNumbers = (gear, numbers) => {
  const adjacentNumbers = numbers.filter((number) => isBetween(number.x, gear.x - 1, gear.x + 1) && isBetween(gear.y, number.y - 1, number.y + number.l));
  return adjacentNumbers.length === 2 ? adjacentNumbers[0].v * adjacentNumbers[1].v : 0;
};

const main = () => {
  const input = parseInput();
  const numbers = extractNumbers(input);
  const gears = extractGears(input);
  let sum = 0;
  for (const gear of gears) {
    sum += getAdjacentNumbers(gear, numbers);
  }
  return sum;
};

answer = main(); // 73646890
