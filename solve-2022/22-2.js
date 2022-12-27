// Part 2

const data = input;

const FACING = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

const parseData = (data) => {
  const [rawGrid, rawPath] = data.split('\n\n');
  const grid = [];
  let W = 0;
  for (const row of rawGrid.split('\n')) {
    grid.push(row.split(''));
    W = Math.max(W, row.length);
  }
  const H = grid.length;
  const S = H / 4;

  // Normalize the grid
  for (const [i, row] of grid.entries()) {
    if (row.length < W) {
      grid[i] = [...row, ...new Array(W - row.length).fill(' ')];
    }
  }

  const pos = {
    x: grid[0].indexOf('.'),
    y: 0,
    facing: 0
  };
  const regex = /(\d+|[LR])/g;
  const path = [...rawPath.matchAll(regex)].map((v) => v[0]);
  return {
    grid, H, W, S, pos, path
  };
};

const moduloEuclidian = (op1, op2) => ((op1 % op2) + op2) % op2;

const getNext = ({ x, y, facing }) => {
  let nextX = x + FACING[facing].x;
  let nextY = y + FACING[facing].y;
  let nextFacing = facing;
  // Considering my grid input is:
  //    5566
  //    5566
  //    44
  //    44
  //  2233
  //  2233
  //  11
  //  11
  //
  // Face 1 : 0 < x < S && 3*S < y < H
  // Face 2 : 0 < x < S && 2*S < y < 3*S
  // Face 3 : S < x < 2*S && 2*S < y < 3*S
  // Face 4 : S < x < 2*S && S < y < 2*S
  // Face 5 : S < x < 2*S && 0 < y < S
  // Face 6 : 2*S < x < W && 0 < y < S
  if (nextX < 0 || nextX >= W || nextY < 0 || nextY >= H || grid[nextY][nextX] === ' ') {
    if (nextX < 0) {
      if (nextY < (S * 3)) { // From 2W to 5W
        nextX = S;
        nextY = ((S * 3)) - 1 - nextY;
        nextFacing = 0;
      } else { // From 1W to 5N
        nextX = S + (nextY - ((S * 3)));
        nextY = 0;
        nextFacing = 1;
      }
    } else if (nextX >= W) { // From 6E to 3E
      nextX = (S * 2) - 1;
      nextY = (S * 2) + (S - 1 - nextY);
      nextFacing = 2;
    } else if (nextY < 0) {
      if (nextX < (S * 2)) { // From 5N to 1W
        nextY = (S * 3) + (nextX - S);
        nextX = 0;
        nextFacing = 0;
      } else { // From 6N to 1S
        nextX -= (S * 2);
        nextY = H - 1;
      }
    } else if (nextY >= H) { // From 1S to 6N
      nextX += (S * 2);
      nextY = 0;
    } else if (nextX === S - 1 && nextFacing === 2) {
      if (nextY < S) { // From 5W to 2W
        nextX = 0;
        nextY = (S * 2) + (S - 1 - nextY);
        nextFacing = 0;
      } else { // From 4W to 2N
        nextX = nextY - S;
        nextY = (S * 2);
        nextFacing = 1;
      }
    } else if (nextX === S && nextFacing === 0) { // From 1E to 3S
      nextX = S + (nextY - (S * 3));
      nextY = (S * 3) - 1;
      nextFacing = 3;
    } else if (nextX === (S * 2) && nextFacing === 0) {
      if (nextY < (S * 2)) { // From 4E to 6S
        nextX = (S * 2) + (nextY - S);
        nextY = S - 1;
        nextFacing = 3;
      } else { // From 3E to 6E
        nextX = W - 1;
        nextY = ((S * 3) - 1 - nextY);
        nextFacing = 2;
      }
    } else if (nextY === S && nextFacing === 1) { // From 6S to 4E
      nextY = S + (nextX - (S * 2));
      nextX = (S * 2) - 1;
      nextFacing = 2;
    } else if (nextY === (S * 2) - 1 && nextFacing === 3) { // From 2N to 4W
      nextY = S + nextX;
      nextX = S;
      nextFacing = 0;
    } else if (nextY === (S * 3) && nextFacing === 1) { // From 3S to 1E
      nextY = (S * 3) + (nextX - S);
      nextX = S - 1;
      nextFacing = 2;
    } else {
      console.error('Error: unknown case', { nextX, nextY, nextFacing });
      process.exit();
    }
  }
  return { nextX, nextY, nextFacing };
};

const {
  grid, H, W, S, pos, path
} = parseData(data);
while (path.length > 0) {
  const action = path.shift();
  if (action === 'R') {
    pos.facing = moduloEuclidian(pos.facing + 1, FACING.length);
  } else if (action === 'L') {
    pos.facing = moduloEuclidian(pos.facing - 1, FACING.length);
  } else {
    const moves = Number(action);
    for (let i = 0; i < moves; i++) {
      const { nextX, nextY, nextFacing } = getNext(pos);
      if (grid[nextY][nextX] === '#') {
        break;
      } else {
        pos.x = nextX;
        pos.y = nextY;
        pos.facing = nextFacing;
      }
    }
  }
}
answer = (1_000 * (pos.y + 1)) + (4 * (pos.x + 1)) + pos.facing;
