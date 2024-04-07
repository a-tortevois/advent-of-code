// Part 1

const data = input;

const AIR = '.';
const ROCK = '#';
const SAND = 'o';
const SAND_SOURCE = '+';

const sandSource = {
  x: 500,
  y: 0,
};

const getGridIntervalFromData = (data) => {
  const regex = /(?<x>\d+),(?<y>\d+)/g;
  let Xmin = sandSource.x; // Offset to 0
  let Xmax = sandSource.x;
  let Ymin = sandSource.y; // Offset to 0
  let Ymax = sandSource.y;
  let matches = regex.exec(data);
  while (matches !== null) {
    if (matches.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    matches.forEach((match, groupIndex) => {
      if (groupIndex === 1) {
        Xmin = Math.min(Xmin, Number.parseInt(match, 10));
        Xmax = Math.max(Xmax, Number.parseInt(match, 10));
      }
      if (groupIndex === 2) {
        Ymin = Math.min(Ymin, Number.parseInt(match, 10));
        Ymax = Math.max(Ymax, Number.parseInt(match, 10));
      }
    });
    matches = regex.exec(data);
  }
  const W = Xmax - Xmin + 1;
  const H = Ymax - Ymin + 1;
  // Normalize sandSource from 0,0
  sandSource.x -= Xmin;
  sandSource.y -= Ymin;
  return {
    Xmin,
    Xmax,
    Ymin,
    Ymax,
    W,
    H,
  };
};

const normalizeCoords = (coord, gridSettings) => {
  return { x: coord.x - gridSettings.Xmin, y: coord.y - gridSettings.Ymin };
};

const getCoordsFromString = (coordStr, gridSettings) => {
  const [x, y] = coordStr.split(',').map(Number);
  return normalizeCoords({ x, y }, gridSettings);
};

const getGridFromData = (data, gridSettings) => {
  const grid = Array.from({ length: gridSettings.H }, () => Array(gridSettings.W).fill(AIR));
  grid[sandSource.y][sandSource.x] = SAND_SOURCE;
  const lines = data.split('\n').map((v) => v.split(' -> '));
  for (const line of lines) {
    let previousCoord = getCoordsFromString(line.shift(), gridSettings);
    for (const coordStr of line) {
      const actualCoord = getCoordsFromString(coordStr, gridSettings);
      if (actualCoord.x === previousCoord.x) {
        const min = Math.min(previousCoord.y, actualCoord.y);
        const max = Math.max(previousCoord.y, actualCoord.y);
        for (let i = min; i <= max; i++) {
          grid[i][actualCoord.x] = ROCK;
        }
      }
      if (actualCoord.y === previousCoord.y) {
        const min = Math.min(previousCoord.x, actualCoord.x);
        const max = Math.max(previousCoord.x, actualCoord.x);
        for (let i = min; i <= max; i++) {
          grid[actualCoord.y][i] = ROCK;
        }
      }
      previousCoord = actualCoord;
    }
  }
  return grid;
};

const printGrid = (grid, gridSettings) => {
  for (let i = 0; i < gridSettings.H; i++) {
    console.warn(`${i}`.padStart(3, '0'), grid[i].join(''));
  }
};

const dropOneGrainOfSand = (grid, gridSettings) => {
  let x = sandSource.x;
  let y = sandSource.y;
  if (grid[y][x] === SAND) {
    console.warn('Maximum is reached');
    return false;
  }
  while (y < gridSettings.H) {
    if (x - 1 < 0 || x + 1 >= gridSettings.W || y + 1 >= gridSettings.H) {
      console.warn('Out of bounds');
      return false;
    }
    if (grid[y + 1][x] === AIR) {
      y++;
    } else if (grid[y + 1][x - 1] === AIR) {
      y++;
      x--;
    } else if (grid[y + 1][x + 1] === AIR) {
      y++;
      x++;
    } else {
      break;
    }
  }
  grid[y][x] = SAND;
  return true;
};

const gridSettings = getGridIntervalFromData(data);
// console.warn({sandSource});
// console.warn({gridSettings});
const grid = getGridFromData(data, gridSettings);
// printGrid(grid, gridSettings);
let count = 0;
while (dropOneGrainOfSand(grid, gridSettings)) {
  count++;
}
printGrid(grid, gridSettings);

answer = count;
