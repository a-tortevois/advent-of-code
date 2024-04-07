// Part 1

const data = input;

const DIRECTIONS = {
  '>': { x: 1, y: 0 },
  v: { x: 0, y: 1 },
  '<': { x: -1, y: 0 },
  '^': { x: 0, y: -1 },
};

const coordsToString = ({ x, y }) => `${x};${y}`;

const moduloEuclidian = (op1, op2) => ((op1 % op2) + op2) % op2;

const parseData = (data) => {
  const grid = [];
  for (const [i, row] of data.split('\n').entries()) {
    grid[i] = row.split('');
  }
  const H = grid.length;
  const W = grid[0].length;
  const expeditionPos = {
    x: grid[0].indexOf('.'),
    y: 0,
  };
  const exitPoint = {
    x: grid[H - 1].indexOf('.'),
    y: H - 2,
  };
  const blizzardsPositions = [];
  const maxPositions = (H - 2) * (W - 2) + 1;
  for (let t = 0; t < maxPositions; t++) {
    const blizzardsPositionsAtTime = new Set();
    for (let i = 1; i < H - 1; i++) {
      for (let j = 1; j < W - 1; j++) {
        let nextX = null;
        let nextY = null;
        switch (grid[i][j]) {
          case '>': {
            nextX = 1 + moduloEuclidian(j + t - 1, W - 2);
            nextY = i;
            break;
          }
          case '<': {
            nextX = 1 + moduloEuclidian(j - t - 1, W - 2);
            nextY = i;
            break;
          }
          case 'v': {
            nextX = j;
            nextY = 1 + moduloEuclidian(i + t - 1, H - 2);
            break;
          }
          case '^': {
            nextX = j;
            nextY = 1 + moduloEuclidian(i - t - 1, H - 2);
            break;
          }
          default: {
            throw new Error('Unknown symbol:', grid[i][j], 'at:', { i, j });
          }
        }
        if (nextX && nextY) {
          blizzardsPositionsAtTime.add(coordsToString({ x: nextX, y: nextY }));
        }
      }
    }
    blizzardsPositions[t] = blizzardsPositionsAtTime;
  }

  return {
    blizzardsPositions,
    H,
    W,
    expeditionPos,
    exitPoint,
  };
};

const isExitPoint = ({ x, y }) => x === exitPoint.x && y === exitPoint.y;

const isValidCoord = ({ x, y }) => x > 0 && x < W - 1 && y > 0 && y < H - 1;

const getVonNeumannNeighborhood = ({ x, y }) =>
  [DIRECTIONS['>'], DIRECTIONS.v, DIRECTIONS['<'], DIRECTIONS['^']]
    .map((v) => {
      return { x: x + v.x, y: y + v.y };
    })
    .filter((v) => isValidCoord(v));

const getHashOfPositionInTime = ({ x, y, t }) => `${x}:${y}:${t}`;

const printBlizzardsPositionsAt = (t) => {
  console.warn('\n=== Blizzards Position at', t, '===\n');
  const grid = Array.from({ length: H }, () => new Array(W).fill('.'));
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (blizzardsPositions[t].has(coordsToString({ x: j, y: i }))) {
        grid[i][j] = '#';
      }
    }
    console.warn(grid[i].join(''));
  }
};

const doExploration = () => {
  const visited = new Set();
  const queue = [{ x: expeditionPos.x, y: expeditionPos.y, t: 0 }];
  while (queue.length > 0) {
    const { x, y, t } = queue.shift();
    if (isExitPoint({ x, y })) {
      return t + 1;
    }
    const hash = getHashOfPositionInTime({ x, y, t });
    if (visited.has(hash)) {
      continue;
    }
    visited.add(hash);
    const nextToExplore = getVonNeumannNeighborhood({ x, y });
    nextToExplore.unshift({ x, y }); // Assure to wait at the same position
    for (const { x, y } of nextToExplore) {
      if (!blizzardsPositions[t + 1].has(coordsToString({ x, y }))) {
        queue.push({ x, y, t: t + 1 });
      }
    }
  }
};

const { blizzardsPositions, H, W, expeditionPos, exitPoint } = parseData(data);
answer = doExploration();
