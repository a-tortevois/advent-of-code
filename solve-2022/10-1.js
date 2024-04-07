// Part 1

const instructions = input.split('\n').map((v) => v.split(' '));

let X = 1;
let cyclesCount = 0;
let signalStrength = 0;

const consumeCycle = () => {
  cyclesCount++;
  if (cyclesCount % 40 === 20) {
    signalStrength += X * cyclesCount;
    console.warn({ cyclesCount, X, signalStrength });
  }
};

for (const instruction of instructions) {
  if (instruction[0] === 'noop') {
    consumeCycle();
  } else if (instruction[0] === 'addx') {
    consumeCycle();
    consumeCycle();
    X += Number.parseInt(instruction[1], 10);
  }
  if (cyclesCount >= 220) {
    break;
  }
}

answer = signalStrength;
