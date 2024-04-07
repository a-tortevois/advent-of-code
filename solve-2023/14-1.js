// Part 1

const ROUNDED_ROCK = 'O';
const CUBE_SHAPED_ROCK = '#';
const SPACE = '.';

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

const moveAllToNorth = () => {
  for (const { x, y } of roundedRocks) {
    let j = y - 1;
    while (isValidCoord({ x, y: j }) && grid[j][x] === SPACE) {
      j--;
    }
    grid[y][x] = SPACE;
    grid[j + 1][x] = ROUNDED_ROCK;
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
  moveAllToNorth();
  return computeLoad();
};

answer = main(); // 103333
