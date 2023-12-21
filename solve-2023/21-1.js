// Part 1

let grid;
let H;
let W;
const startingPoint = {
  x: 0,
  y: 0
};

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
};

const coordToString = (c) => `${c.x};${c.y}`;

const stringToCoord = (c) => {
  const [x, y] = c.split(';').map(Number);
  return { x, y };
};

const isValidCoord = (c) => (c.x >= 0 && c.x < W && c.y >= 0 && c.y < H);

const getVonNeumannNeighborhoods = (c) => [{ x: c.x + 1, y: c.y }, { x: c.x - 1, y: c.y }, { x: c.x, y: c.y - 1 }, { x: c.x, y: c.y + 1 }].filter((c) => isValidCoord(c));

const isReachable = (c) => grid[c.y][c.x] !== '#';

const getNextPositions = (p) => getVonNeumannNeighborhoods(stringToCoord(p)).filter(isReachable).map(coordToString);

const walk = (steps) => {
  const positions = [coordToString(startingPoint)];
  for (let n = 0; n < steps; n++) {
    const nextPositions = new Set();
    for (const p of positions) {
      for (const nextPosition of getNextPositions(p)) {
        nextPositions.add(nextPosition);
      }
    }
    positions.length = 0;
    positions.push(...nextPositions);
  }
  return positions.length;
};

const main = () => {
  parseInput();
  return walk(64);
};

answer = main(); // 3746
