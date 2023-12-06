// Part 1

const parseInput = () => {
  const lines = input.split('\n').map((line) => line.split(':')[1].trim().split(/\s+/).map(Number));
  return lines;
};

const main = () => {
  const [times, distances] = parseInput();
  let sum = 1;
  for (let i = 0; i < times.length; i++) {
    let winningRound = 0;
    for (let speed = 1; speed < times[i]; speed++) {
      if (speed * (times[i] - speed) > distances[i]) {
        winningRound++;
      }
    }
    sum *= winningRound;
  }
  return sum;
};

answer = main(); // 4403592
