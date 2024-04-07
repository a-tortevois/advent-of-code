// Part 1

let xMax = 0;
let yMax = 0;
let zMax = 0;

const parseInput = () => {
  const bricks = [];
  for (const line of input.split('\n')) {
    bricks.push(
      line.split('~').map((coord) => {
        const [x, y, z] = coord.split(',').map(Number);
        xMax = Math.max(xMax, x);
        yMax = Math.max(yMax, y);
        zMax = Math.max(zMax, z);
        return [x, y, z];
      }),
    );
  }
  bricks.sort((a, b) => a[0].z - b[0].z);
  return bricks;
};

const initGrid = (bricks) => {
  // Initialize 3D grid
  const grid = Array.from({ length: zMax + 1 }, () => Array.from({ length: yMax + 1 }, () => Array.from({ length: xMax + 1 }, () => 0)));
  // Add bricks to the 3D grid
  for (let brickIndex = 0; brickIndex < bricks.length; brickIndex++) {
    const [[x1, y1, z1], [x2, y2, z2]] = bricks[brickIndex];
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        grid[0][y][x] = -1; // Initialize ground
        for (let z = z1; z <= z2; z++) {
          grid[z][y][x] = brickIndex + 1;
        }
      }
    }
  }
  return grid;
};

const brickCanMove = (grid, bricks, brickIndex) => {
  const [[x1, y1, z1], [x2, y2, z2]] = bricks[brickIndex];
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      for (let z = z1; z <= z2; z++) {
        const below = grid[z - 1][y][x]; // will be 0 if empty
        if (below && below !== brickIndex + 1) {
          return false;
        }
      }
    }
  }
  return true;
};

const moveBrickDown = (grid, bricks, brickIndex) => {
  const [[x1, y1, z1], [x2, y2, z2]] = bricks[brickIndex];
  bricks[brickIndex] = [
    [x1, y1, z1 - 1],
    [x2, y2, z2 - 1],
  ];
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      for (let z = z1; z <= z2; z++) {
        grid[z][y][x] = 0;
        grid[z - 1][y][x] = brickIndex + 1;
      }
    }
  }
};

const fallingBricks = (grid, bricks) => {
  const fallingBricks = new Set();
  let supported;
  do {
    supported = 0;
    for (let brickIndex = 0; brickIndex < bricks.length; brickIndex++) {
      if (brickCanMove(grid, bricks, brickIndex)) {
        moveBrickDown(grid, bricks, brickIndex);
        fallingBricks.add(brickIndex);
      } else {
        supported++;
      }
    }
  } while (supported !== bricks.length);
  return fallingBricks.size;
};

const canBeDisintegrated = (grid, bricks, brickIndex) => {
  const [[x1, y1, z1], [x2, y2, z2]] = bricks[brickIndex];

  // Remove brick
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      for (let z = z1; z <= z2; z++) {
        grid[z][y][x] = 0;
      }
    }
  }

  let canBeDisintegrated = true;
  for (let i = 0; i < bricks.length; i++) {
    if (i === brickIndex) {
      continue;
    }
    if (brickCanMove(grid, bricks, i)) {
      canBeDisintegrated = false;
      break;
    }
  }

  // Put back
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      for (let z = z1; z <= z2; z++) {
        grid[z][y][x] = brickIndex + 1;
      }
    }
  }

  return canBeDisintegrated;
};

const main = () => {
  const bricks = parseInput();
  const grid = initGrid(bricks);
  fallingBricks(grid, bricks);

  let count = 0;
  for (let brickIndex = 0; brickIndex < bricks.length; brickIndex++) {
    if (canBeDisintegrated(grid, bricks, brickIndex)) {
      count++;
    }
  }
  return count;
};

answer = main(); // 407
