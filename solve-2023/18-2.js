// Part 2

const DIGIT_TO_DIRECTION = ['R', 'D', 'L', 'U'];

const DIRECTION = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

const instructions = [];

const parseInput = () => {
  for (const lines of input.split('\n')) {
    const line = lines.split(' ');
    instructions.push({
      dir: DIGIT_TO_DIRECTION[Number(line[2].slice(-2, -1))],
      n: Number.parseInt(line[2].slice(2, -2), 16),
    });
  }
};

const execInstructions = () => {
  let aera = 0;
  const p0 = { x: 0, y: 0 }; // Previous
  const p1 = { x: 0, y: 0 }; // Current
  for (const { n, dir } of instructions) {
    const { x: dx, y: dy } = DIRECTION[dir];
    p1.x = p0.x + n * dx;
    p1.y = p0.y + n * dy;
    // https://en.wikipedia.org/wiki/Shoelace_formula
    // Don't forget to add the current line in the area
    aera += (n + p0.x * p1.y - p1.x * p0.y) / 2;
    p0.x = p1.x;
    p0.y = p1.y;
  }
  return aera + 1; // The result differs by 1
};

const main = () => {
  parseInput();
  return execInstructions();
};

answer = main(); // 40654918441248
