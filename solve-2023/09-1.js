// Part 1

const parseInput = () => input.split('\n').map((line) => line.trim().split(' ').map(Number));

const extrapolateLine = (line) => {
  const extrapolation = [];
  for (let i = 0; i < line.length - 1; i++) {
    extrapolation.push(line[i + 1] - line[i]);
  }
  return extrapolation;
};

const predictNextValue = (line1, line2) => {
  line2.push(line2[line2.length - 1] + line1[line1.length - 1]);
};

const main = () => {
  const lines = parseInput();
  let sum = 0;
  for (const line of lines) {
    const extrapolations = Array.from([line]);
    while (!/^[0]+$/.test(extrapolations[extrapolations.length - 1].join(''))) {
      extrapolations.push(extrapolateLine(extrapolations[extrapolations.length - 1]));
    }
    const extrapolationsLength = extrapolations.length - 1;
    for (let i = 0; i < extrapolations.length - 1; i++) {
      predictNextValue(extrapolations[extrapolationsLength - i], extrapolations[extrapolationsLength - i - 1]);
    }
    sum += extrapolations[0][extrapolations[0].length - 1];
  }
  return sum;
};

answer = main(); // 1987402313
