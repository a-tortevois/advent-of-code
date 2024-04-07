// Part 1

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

const beams = [];
const cellsVisited = new Set();
const cellsEnergized = new Set();
let max = 0;

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

const execTicksFrom = (ticks, startingCoord) => {
  for (let i = 0; i < ticks; i++) {
    cellsEnergized.clear();
    cellsVisited.clear();
    beams.length = 0;
    beams.push(startingCoord(i));
    let prevSize;
    do {
      prevSize = cellsVisited.size;
      execOneTick();
    } while (prevSize !== cellsVisited.size);
    max = Math.max(max, cellsEnergized.size);
  }
};

const printGrid = (grid) => {
  for (const line of grid) {
    console.log(line.join(''));
  }
};

const printVisited = () => {
  const gridVisited = Array.from({ length: H }, () => Array.from({ length: W }, () => '.'));
  for (const key of cellsVisited.keys()) {
    const { x, y } = strToBeam(key);
    gridVisited[y][x] = '#';
  }
  printGrid(gridVisited);
};

const main = () => {
  parseInput();

  // From any tile in the top row (heading downward)
  execTicksFrom(H, (i) => {
    return {
      x: i,
      y: 0,
      dir: UP_TO_DOWN,
    };
  });

  // From any tile in the bottom row (heading upward)
  execTicksFrom(H, (i) => {
    return {
      x: i,
      y: H - 1,
      dir: DOWN_TO_UP,
    };
  });

  // From any tile in the leftmost column (heading right)
  execTicksFrom(W, (i) => {
    return {
      x: 0,
      y: i,
      dir: LEFT_TO_RIGHT,
    };
  });

  // From any tile in the rightmost column (heading left)
  execTicksFrom(W, (i) => {
    return {
      x: W - 1,
      y: i,
      dir: RIGHT_TO_LEFT,
    };
  });

  return max;
};

answer = main(); // 8183
