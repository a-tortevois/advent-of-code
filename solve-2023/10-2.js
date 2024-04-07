// Part 2

const PIPES = {
  '|': [
    // | is a vertical pipe connecting north and south
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ],
  '-': [
    // - is a horizontal pipe connecting east and west
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ],
  L: [
    // L is a 90-degree bend connecting north and east
    { x: 0, y: -1 },
    { x: 1, y: 0 },
  ],
  J: [
    // J is a 90-degree bend connecting north and west
    { x: -1, y: 0 },
    { x: 0, y: -1 },
  ],
  7: [
    // 7 is a 90-degree bend connecting south and west
    { x: -1, y: 0 },
    { x: 0, y: 1 },
  ],
  F: [
    // F is a 90-degree bend connecting south and east
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ],
};

const startingPoint = {
  x: null,
  y: null,
};
const grid = [];
let H;
let W;

const parseInput = () => {
  grid.push(
    ...input.split('\n').map((line, index) => {
      if (line.includes('S')) {
        startingPoint.x = line.indexOf('S');
        startingPoint.y = index;
      }
      return line.split('');
    }),
  );
  H = grid.length;
  W = grid[0].length;
};

const coordToString = (c) => `${c.x};${c.y}`;

const isValidCoord = (c) => c.x >= 0 && c.x < W && c.y >= 0 && c.y < H;

const isReachable = (from, to) => {
  const moves = PIPES[grid[from.y][from.x]];
  if (!moves) {
    return false;
  }
  let isReachable = false;
  for (const move of moves) {
    const prevCell = {
      x: from.x + move.x,
      y: from.y + move.y,
    };
    if (prevCell.x === to.x && prevCell.y === to.y) {
      isReachable = true;
      break;
    }
  }
  return isReachable;
};

const getVonNeumannNeighborhoods = (c) =>
  [
    { x: c.x + 1, y: c.y },
    { x: c.x - 1, y: c.y },
    { x: c.x, y: c.y - 1 },
    { x: c.x, y: c.y + 1 },
  ].filter((c) => isValidCoord(c));

const transformStartingPointToPipe = (nextCells) => {
  const interval = [];
  for (const nextCell of nextCells) {
    interval.push(
      coordToString({
        x: nextCell.x - startingPoint.x,
        y: nextCell.y - startingPoint.y,
      }),
    );
  }
  let pipeFound = null;
  for (const [pipe, coords] of Object.entries(PIPES)) {
    if (interval.includes(coordToString(coords[0])) && interval.includes(coordToString(coords[0]))) {
      pipeFound = pipe;
      break;
    }
  }
  grid[startingPoint.y][startingPoint.x] = pipeFound;
};

const getInitialPath = () => {
  let nextCells;
  // First move
  const path = [coordToString(startingPoint)];
  nextCells = getVonNeumannNeighborhoods(startingPoint).filter((to) => isReachable(to, startingPoint));
  transformStartingPointToPipe(nextCells);
  // Search complete path
  while (nextCells.length > 0) {
    path.push(coordToString(nextCells[0]));
    nextCells = getVonNeumannNeighborhoods(nextCells[0])
      .filter((to) => isReachable(nextCells[0], to))
      .filter((c) => !path.includes(coordToString(c)));
    if (nextCells.length > 1) {
      throw new Error('Unable to find a unique next cell', nextCells);
    }
  }
  return path;
};

const BFS = (from, grid) => {
  const getNeighborhoods = (c) =>
    [
      { x: c.x + 1, y: c.y },
      { x: c.x - 1, y: c.y },
      { x: c.x, y: c.y - 1 },
      { x: c.x, y: c.y + 1 },
    ].filter((c) => c.x >= 0 && c.x < grid[0].length && c.y >= 0 && c.y < grid.length);
  const toVisit = [from];
  grid[from.y][from.x] = 'O'; // Add the first element to avoid visiting it
  while (toVisit.length > 0) {
    const currentCoord = toVisit.shift();
    const coordsToExplore = getNeighborhoods(currentCoord).filter((c) => grid[c.y][c.x] === '.');
    for (const coord of coordsToExplore) {
      grid[coord.y][coord.x] = 'O';
      toVisit.push(coord);
    }
  }
};

const printGrid = (grid) => {
  for (const elem of grid) {
    console.log(elem.join(''));
  }
};

const main = () => {
  parseInput();
  const initialPath = getInitialPath();

  // Create a double grid: insert fake cells
  const grid2 = Array.from({ length: W * 2 }, () => Array(H * 2).fill('.'));
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const x2 = x * 2;
      const y2 = y * 2;
      if (initialPath.includes(coordToString({ x, y }))) {
        grid2[y2][x2] = 'X';
        for (const cell of PIPES[grid[y][x]]) {
          const x2 = x * 2 + cell.x;
          const y2 = y * 2 + cell.y;
          grid2[y2][x2] = 'X';
        }
      }
    }
  }

  // Fill reachable cells outside the loop
  BFS({ x: 0, y: 0 }, grid2);

  // Finally, calculate the cells inside the loop
  let sum = 0;
  for (let y = 0; y < H * 2; y += 2) {
    for (let x = 0; x < W * 2; x += 2) {
      if (grid2[y][x] === '.') {
        sum++;
      }
    }
  }
  return sum;
};

answer = main(); // 459
