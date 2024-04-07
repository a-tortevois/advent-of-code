// Part 2

const UP_TO_DOWN = 'UP_TO_DOWN';
const DOWN_TO_UP = 'DOWN_TO_UP';
const LEFT_TO_RIGHT = 'LEFT_TO_RIGHT';
const RIGHT_TO_LEFT = 'RIGHT_TO_LEFT';

const DIRECTION = {
  UP_TO_DOWN: { s: 'v', x: 0, y: 1 },
  DOWN_TO_UP: { s: '^', x: 0, y: -1 },
  RIGHT_TO_LEFT: { s: '<', x: -1, y: 0 },
  LEFT_TO_RIGHT: { s: '>', x: 1, y: 0 },
};

let grid;
let W;
let H;

const beams = [
  {
    x: 0,
    y: 0,
    dir: LEFT_TO_RIGHT,
  },
];

const cellsVisited = new Set();
const cellsEnergized = new Set();

const parseInput = () => {
  grid = input.split('\n').map((line) => line.split(''));
  H = grid.length;
  W = grid[0].length;
};

const beamToString = (flowHead) => `${flowHead.x};${flowHead.y};${flowHead.dir}`;

const strToBeam = (str) => {
  const [x, y, dir] = str.split(';');
  return { x, y, dir };
};

const isValidCoord = (c) => c.x >= 0 && c.x < W && c.y >= 0 && c.y < H;

const getNextDirections = (currentCell, currentDirection) => {
  if (currentCell === '.') {
    return [currentDirection];
  }
  if (currentCell === '/') {
    if (currentDirection === UP_TO_DOWN) {
      return [RIGHT_TO_LEFT];
    }
    if (currentDirection === DOWN_TO_UP) {
      return [LEFT_TO_RIGHT];
    }
    if (currentDirection === LEFT_TO_RIGHT) {
      return [DOWN_TO_UP];
    }
    if (currentDirection === RIGHT_TO_LEFT) {
      return [UP_TO_DOWN];
    }
  }
  if (currentCell === '\\') {
    if (currentDirection === UP_TO_DOWN) {
      return [LEFT_TO_RIGHT];
    }
    if (currentDirection === DOWN_TO_UP) {
      return [RIGHT_TO_LEFT];
    }
    if (currentDirection === LEFT_TO_RIGHT) {
      return [UP_TO_DOWN];
    }
    if (currentDirection === RIGHT_TO_LEFT) {
      return [DOWN_TO_UP];
    }
  }
  if (currentCell === '-') {
    if ([RIGHT_TO_LEFT, LEFT_TO_RIGHT].includes(currentDirection)) {
      return [currentDirection];
    }
    return [RIGHT_TO_LEFT, LEFT_TO_RIGHT];
  }

  if (currentCell === '|') {
    if ([UP_TO_DOWN, DOWN_TO_UP].includes(currentDirection)) {
      return [currentDirection];
    }
    return [UP_TO_DOWN, DOWN_TO_UP];
  }
};

const getNextBeams = (beam) =>
  getNextDirections(grid[beam.y][beam.x], beam.dir)
    .map((nextDir) => {
      return {
        x: beam.x + DIRECTION[nextDir].x,
        y: beam.y + DIRECTION[nextDir].y,
        dir: nextDir,
      };
    })
    .filter(isValidCoord)
    .filter((nextCell) => !cellsVisited.has(beamToString(nextCell)));

const execOneTick = () => {
  const nextBeams = [];
  for (const beam of beams) {
    cellsEnergized.add(`${beam.x};${beam.y}`);
    cellsVisited.add(beamToString(beam));
    nextBeams.push(...getNextBeams(beam));
  }
  beams.length = 0;
  beams.push(...nextBeams);
};

const main = () => {
  parseInput();
  let prevSize;
  do {
    prevSize = cellsVisited.size;
    execOneTick();
  } while (prevSize !== cellsVisited.size);
  return cellsEnergized.size;
};

answer = main(); // 7434
