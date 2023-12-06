// Part 2

const parseInput = () => {
  const lines = input.split('\n').map((line) => line.split(':')[1].replaceAll((' '), '')).map(Number);
  return lines;
};

const main = () => {
  const [time, distance] = parseInput();
  let sum = 0;
  for (let speed = 1; speed < time; speed++) {
    if (speed * (time - speed) > distance) {
      sum++;
    }
  }
  return sum;
};

answer = main(); // 38017587
