// Part 2

/* eslint-disable default-case */
/* eslint-disable array-callback-return */

const ROUNDED_ROCK = 'O';
const CUBE_SHAPED_ROCK = '#';
const SPACE = '.';
const CYCLES = 1000000000;
const DIRECTION = {
  NORTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 },
  SOUTH: { x: 0, y: 1 },
  EAST: { x: 1, y: 0 },
};

let grid;
let W;
let H;
const roundedRocks = [];

const parseInput = () => {
  grid = input.split('\n').map((line) => line.split(''));
  W = grid.length;
  H = grid[0].length;
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) {
      if (grid[y][x] === ROUNDED_ROCK) {
        roundedRocks.push({ x, y });
      }
    }
  }
};

const isValidCoord = (c) => c.x >= 0 && c.x < W && c.y >= 0 && c.y < H;

const sortRoundedRocksBeforeMoveTo = (dir) => {
  roundedRocks.sort((a, b) => {
    switch (dir) {
      case 'NORTH':
      case 'WEST': {
        const diff = a.x - b.x;
        return diff !== 0 ? diff : a.y - b.y;
      }
      case 'SOUTH':
      case 'EAST': {
        const diff = b.y - a.y;
        return diff !== 0 ? diff : b.x - a.x;
      }
    }
  });
};

const moveAllTo = (dir) => {
  sortRoundedRocksBeforeMoveTo(dir);
  // biome-ignore lint/style/noParameterAssign:
  dir = DIRECTION[dir];
  for (const r of roundedRocks) {
    let c = { x: r.x + dir.x, y: r.y + dir.y };
    while (isValidCoord(c) && grid[c.y][c.x] === SPACE) {
      c = { x: c.x + dir.x, y: c.y + dir.y };
    }
    grid[r.y][r.x] = SPACE;
    r.x = c.x - dir.x;
    r.y = c.y - dir.y;
    grid[r.y][r.x] = ROUNDED_ROCK;
  }
};

const doOneCycle = () => {
  for (const dir of Object.keys(DIRECTION)) {
    moveAllTo(dir);
  }
};

const doCycles = () => {
  // The rounded rocks will end up looping on the same squares on the grid
  // First, find when the cycles loop again
  const cyclesInMemory = new Map();
  let n;
  let roundedRocksHash;
  for (n = 0; n < CYCLES; n++) {
    roundedRocksHash = JSON.stringify(roundedRocks);
    if (!cyclesInMemory.has(roundedRocksHash)) {
      cyclesInMemory.set(roundedRocksHash, n);
    } else {
      break;
    }
    doOneCycle();
  }
  // Then, do the remaining loop cycle
  const loopLength = n - cyclesInMemory.get(roundedRocksHash);
  const remainingCycles = (CYCLES - n) % loopLength;
  for (let i = 0; i < remainingCycles; i++) {
    doOneCycle();
  }
};

const computeLoad = () => {
  let sum = 0;
  for (let i = 0; i < W; i++) {
    const n = grid[i].filter((r) => r === ROUNDED_ROCK).length;
    sum += (W - i) * n;
  }
  return sum;
};

const main = () => {
  parseInput();
  doCycles();
  return computeLoad();
};

answer = main(); // 97241
