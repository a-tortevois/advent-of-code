// Part 1

const DIRECTION = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

const instructions = [];
const cellState = new Set();
let xMin = 0;
let xMax = 0;
let yMin = 0;
let yMax = 0;

const parseInput = () => {
  for (const lines of input.split('\n')) {
    const line = lines.split(' ');
    instructions.push({
      dir: line[0],
      n: Number(line[1]),
    });
  }
};

const coordToString = (c) => `${c.x};${c.y}`;

const isValidCoord = (c) => c.x >= xMin && c.x < xMax && c.y >= yMin && c.y < yMax;

const execInstructions = () => {
  const currentPos = { x: 0, y: 0 };
  for (const { dir, n, color } of instructions) {
    for (let i = 0; i < n; i++) {
      currentPos.x += DIRECTION[dir].x;
      currentPos.y += DIRECTION[dir].y;
      const coordStr = coordToString(currentPos);
      cellState.add(coordStr);
      xMin = Math.min(xMin, currentPos.x);
      xMax = Math.max(xMax, currentPos.x);
      yMin = Math.min(yMin, currentPos.y);
      yMax = Math.max(yMax, currentPos.y);
    }
  }
};

const getStartingPoint = () => {
  const startingPoint = {
    x: xMin + 1,
    y: yMin + 1,
  };
  for (let i = yMin + 1; i <= yMax; i++) {
    const neighbors = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
    ]
      .map((c) => {
        return { x: startingPoint.x + c.x, y: i + c.y };
      })
      .map(coordToString)
      .reduce((prev, curr) => prev + Number(cellState.has(curr)), 0);
    if (neighbors === 3) {
      startingPoint.y = i;
      break;
    }
  }
  return startingPoint;
};

const getVonNeumannNeighborhoods = (c) =>
  [
    { x: c.x - 1, y: c.y - 1 }, // NE
    { x: c.x, y: c.y - 1 }, // N
    { x: c.x + 1, y: c.y - 1 }, // NW
    { x: c.x - 1, y: c.y }, // E
    { x: c.x + 1, y: c.y }, // W
    { x: c.x - 1, y: c.y + 1 }, // SE
    { x: c.x, y: c.y + 1 }, // S
    { x: c.x + 1, y: c.y + 1 }, // SW
  ].filter((c) => isValidCoord(c));

const fillInnerCells = () => {
  const startingPoint = getStartingPoint();
  const toVisit = [coordToString(startingPoint)];
  const i = 0;
  while (toVisit.length > 0) {
    const [x, y] = toVisit.shift().split(';').map(Number);
    cellState.add(coordToString({ x, y }));
    const nextToVisit = getVonNeumannNeighborhoods({ x, y })
      .map(coordToString)
      .filter((c) => !toVisit.includes(c) && !cellState.has(c));
    toVisit.push(...nextToVisit);
  }
};

const main = () => {
  parseInput();
  execInstructions();
  fillInnerCells();
  return cellState.size;
};

answer = main(); // 48795
