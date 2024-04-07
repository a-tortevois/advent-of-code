// Part 1

const data = input;

const FACING = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

const parseData = (data) => {
  const [rawGrid, rawPath] = data.split('\n\n');
  const grid = [];
  let W = 0;
  for (const row of rawGrid.split('\n')) {
    grid.push(row.split(''));
    W = Math.max(W, row.length);
  }
  const H = grid.length;

  // Normalize the grid
  for (const [i, row] of grid.entries()) {
    if (row.length < W) {
      grid[i] = [...row, ...new Array(W - row.length).fill(' ')];
    }
  }

  const pos = {
    x: grid[0].indexOf('.'),
    y: 0,
    facing: 0,
  };
  const regex = /(\d+|[LR])/g;
  const path = [...rawPath.matchAll(regex)].map((v) => v[0]);
  return {
    grid,
    H,
    W,
    pos,
    path,
  };
};

const moduloEuclidian = (op1, op2) => ((op1 % op2) + op2) % op2;

const { grid, H, W, pos, path } = parseData(data);
while (path.length > 0) {
  const action = path.shift();
  if (action === 'R') {
    pos.facing = moduloEuclidian(pos.facing + 1, FACING.length);
  } else if (action === 'L') {
    pos.facing = moduloEuclidian(pos.facing - 1, FACING.length);
  } else {
    const moves = Number(action);
    for (let i = 0; i < moves; i++) {
      let nextX = moduloEuclidian(pos.x + FACING[pos.facing].x, W);
      let nextY = moduloEuclidian(pos.y + FACING[pos.facing].y, H);
      while (grid[nextY][nextX] === ' ') {
        nextX = moduloEuclidian(nextX + FACING[pos.facing].x, W);
        nextY = moduloEuclidian(nextY + FACING[pos.facing].y, H);
      }
      if (grid[nextY][nextX] === '#') {
        break;
      }
      pos.x = nextX;
      pos.y = nextY;
    }
  }
}

answer = 1_000 * (pos.y + 1) + 4 * (pos.x + 1) + pos.facing;
