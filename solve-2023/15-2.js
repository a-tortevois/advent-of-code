// Part 2

const OPERATION = {
  HIGHLIGHT: '=',
  REMOVE: '-',
};

let steps;
const boxes = Array.from({ length: 256 }, () => []);
const labelToFocalLength = {};

const parseInput = () => {
  steps = input.split(',').map((sequence) => {
    let step;
    if (sequence.includes('=')) {
      const [label, focal] = sequence.split('=');
      step = {
        operation: OPERATION.HIGHLIGHT,
        label,
        focal: Number(focal),
      };
    } else {
      step = {
        operation: OPERATION.REMOVE,
        label: sequence.slice(0, -1),
      };
    }
    return step;
  });
};

const getHash = (str) => {
  let hash = 0;
  for (const char of str) {
    hash += char.charCodeAt(0);
    hash *= 17;
    hash %= 256;
  }
  return hash;
};

const applySteps = () => {
  for (const step of steps) {
    if (step.focal) {
      labelToFocalLength[step.label] = step.focal;
    }
    const hash = getHash(step.label);
    if (step.operation === OPERATION.HIGHLIGHT && !boxes[hash].includes(step.label)) {
      boxes[hash].push(step.label);
    }
    if (step.operation === OPERATION.REMOVE) {
      boxes[hash] = boxes[hash].filter((label) => label !== step.label);
    }
  }
};

const computeFocusingPower = () => {
  let sum = 0;
  for (let box = 0; box < boxes.length; box++) {
    for (let slot = 0; slot < boxes[box].length; slot++) {
      sum += (box + 1) * (slot + 1) * labelToFocalLength[boxes[box][slot]];
    }
  }
  return sum;
};

const main = () => {
  parseInput();
  applySteps();
  return computeFocusingPower();
};

answer = main(); // 262454
