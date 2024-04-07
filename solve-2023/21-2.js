// Part 2

const STEPS = 26501365;
let SIZE;
let MIDDLE;

let grid;
let H;
let W;
const startingPoint = {
  x: 0,
  y: 0,
};
const countsInMemory = [];

const parseInput = () => {
  grid = input.split('\n').map((line, index) => {
    if (line.includes('S')) {
      startingPoint.x = line.indexOf('S');
      startingPoint.y = index;
    }
    return line.split('');
  });
  H = grid.length;
  W = grid[0].length;
  SIZE = grid.length;
  MIDDLE = startingPoint.x;
};

const coordToString = (c) => `${c.x};${c.y}`;

const stringToCoord = (c) => {
  const [x, y] = c.split(';').map(Number);
  return { x, y };
};

const getVonNeumannNeighborhoods = (c) => [
  { x: c.x + 1, y: c.y },
  { x: c.x - 1, y: c.y },
  { x: c.x, y: c.y - 1 },
  { x: c.x, y: c.y + 1 },
];

const safeModulo = (a, b) => ((a % b) + b) % b;

const isReachable = (c) => grid[safeModulo(c.y, H)][safeModulo(c.x, W)] !== '#';

const getNextPositions = (p) => getVonNeumannNeighborhoods(stringToCoord(p)).filter(isReachable).map(coordToString);

const walk = (steps) => {
  // countsInMemory.push(
  //   3889, // 65
  //   34504, // 196
  //   95591 // 327
  // );
  let positions = new Set([coordToString(startingPoint)]);
  for (let n = 0; n < steps; n++) {
    const nextPositions = new Set();
    if (n === MIDDLE || (n - MIDDLE) % SIZE === 0) {
      console.log('step', n, '=>', positions.size);
      countsInMemory.push(positions.size);
    }
    for (const p of positions) {
      for (const nextPosition of getNextPositions(p)) {
        nextPositions.add(nextPosition);
      }
    }
    positions = nextPositions;
  }
};

const getLagrangePolynomialCoefficients = ([y0, y1, y2]) => {
  // https://en.wikipedia.org/wiki/Lagrange_polynomial
  // Rule for making a quadratic equation from three points (0,y0), (1,y1) and (2,y2):
  //
  //         (y0 − y1 + y2) * x² + (−3y0 + 4y1 − y2) * x + 2y0
  // f(x) = ---------------------------------------------------
  //                                 2
  // with:
  // x = (26501365 - 65) / 131 = 202300
  // y0 = counts[0] => positions after 65 steps
  // y1 = counts[1] => positions after 196 steps (65 + 131)
  // y2 = counts[2] => positions after 327 steps (65 + 2 * 131)
  const a = (y0 - 2 * y1 + y2) / 2;
  const b = (-3 * y0 + 4 * y1 - y2) / 2;
  const c = y0;
  return [a, b, c];
};

const interpolate = () => {
  const [a, b, c] = getLagrangePolynomialCoefficients(countsInMemory);
  const x = (STEPS - MIDDLE) / SIZE;
  return a * x ** 2 + b * x + c;
};

const main = () => {
  parseInput();
  const steps = MIDDLE + SIZE * 2 + 1; // To cover three-map-by-three-map
  walk(steps);
  return interpolate();
};

answer = main(); // 623540829615589
