// Part 1

const PIPES = {
  '|': [{ x: 0, y: -1 }, { x: 0, y: 1 }], // | is a vertical pipe connecting north and south
  '-': [{ x: -1, y: 0 }, { x: 1, y: 0 }], // - is a horizontal pipe connecting east and west
  'L': [{ x: 0, y: -1 }, { x: 1, y: 0 }], // L is a 90-degree bend connecting north and east
  'J': [{ x: -1, y: 0 }, { x: 0, y: -1 }], // J is a 90-degree bend connecting north and west
  '7': [{ x: -1, y: 0 }, { x: 0, y: 1 }], // 7 is a 90-degree bend connecting south and west
  'F': [{ x: 1, y: 0 }, { x: 0, y: 1 }] // F is a 90-degree bend connecting south and east
};

// ---
// Global variables
// ---

const startingPoint = {
  x: null,
  y: null
};
let grid;
let H;
let W;

// ---

const parseInput = () => {
  grid = input.split('\n').map((line, index) => {
    if (line.includes('S')) {
      startingPoint.x = line.indexOf('S');
      startingPoint.y = index;
    }
    return line.split('');
  });
};

const coordToString = (c) => `${c.x};${c.y}`;

const isValidCoord = (c) => (c.x >= 0 && c.x < W && c.y >= 0 && c.y < H);

const isReachable = (from, to) => {
  const moves = PIPES[grid[from.y][from.x]];
  if (!moves) {
    return false;
  }
  let isReachable = false;
  for (const move of moves) {
    const prevCell = {
      x: from.x + move.x,
      y: from.y + move.y
    };
    if (prevCell.x === to.x && prevCell.y === to.y) {
      isReachable = true;
      break;
    }
  }
  return isReachable;
};

const getVonNeumannNeighborhoods = (c) => [{ x: c.x + 1, y: c.y }, { x: c.x - 1, y: c.y }, { x: c.x, y: c.y - 1 }, { x: c.x, y: c.y + 1 }].filter((c) => isValidCoord(c));

// const transformStartingPointToPipe = (nextCells) => {
//   const interval = [];
//   for (const nextCell of nextCells) {
//     interval.push(coordToString({
//       x: nextCell.x - startingPoint.x,
//       y: nextCell.y - startingPoint.y
//     }));
//   }
//   let pipeFound = null;
//   for (const [pipe, coords] of Object.entries(PIPES)) {
//     if (interval.includes(coordToString(coords[0])) && interval.includes(coordToString(coords[0]))) {
//       pipeFound = pipe;
//       break;
//     }
//   }
//   grid[startingPoint.y][startingPoint.x] = pipeFound;
// };

const main = () => {
  parseInput();
  H = grid.length;
  W = grid[0].length;

  console.log(grid, startingPoint);

  let nextCells;
  let nextCell;

  // First move
  const path = [coordToString(startingPoint)];
  nextCells = getVonNeumannNeighborhoods(startingPoint).filter((to) => isReachable(to, startingPoint));
  // transformStartingPointToPipe(nextCells);
  nextCell = nextCells[0];

  while (true) {
    path.push(coordToString(nextCell));
    nextCells = getVonNeumannNeighborhoods(nextCell).filter((to) => isReachable(nextCell, to)).filter((c) => !path.includes(coordToString(c)));
    if (nextCells.length > 1) {
      throw new Error('Unable to find a unique next cell', nextCells);
    }
    if (nextCells.length === 0) {
      break;
    }
    nextCell = nextCells[0];
  }
  return (path.length / 2);
};

answer = main(); // 6828
