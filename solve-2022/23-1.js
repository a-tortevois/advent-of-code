// Part 1

const data = input;

const DIRECTIONS = {
  NW: { x: -1, y: -1 },
  N: { x: 0, y: -1 },
  NE: { x: 1, y: -1 },
  W: { x: -1, y: 0 },
  E: { x: 1, y: 0 },
  SW: { x: -1, y: 1 },
  S: { x: 0, y: 1 },
  SE: { x: 1, y: 1 },
};

const coordsToString = ({ x, y }) => `${x};${y}`;

const parseData = (data) => {
  const elvesPositions = new Set();
  for (const [i, row] of data.split('\n').entries()) {
    for (const [j, elem] of row.split('').entries()) {
      if (elem === '#') {
        elvesPositions.add(coordsToString({ x: j, y: i }));
      }
    }
  }
  return elvesPositions;
};

const hasNeighbors = ({ x, y }) => {
  const coords = [DIRECTIONS.NW, DIRECTIONS.N, DIRECTIONS.NE, DIRECTIONS.W, DIRECTIONS.E, DIRECTIONS.SW, DIRECTIONS.S, DIRECTIONS.SE].map((v) => coordsToString({ x: x + v.x, y: y + v.y }));
  for (const coord of coords) {
    if (elvesPositions.has(coord)) {
      return true;
    }
  }
  return false;
};

const canMoveToNorth = ({ x, y }) => {
  const coords = [DIRECTIONS.NW, DIRECTIONS.N, DIRECTIONS.NE].map((v) => coordsToString({ x: x + v.x, y: y + v.y }));
  for (const coord of coords) {
    if (elvesPositions.has(coord)) {
      return false;
    }
  }
  return true;
};

const canMoveToSouth = ({ x, y }) => {
  const coords = [DIRECTIONS.SW, DIRECTIONS.S, DIRECTIONS.SE].map((v) => coordsToString({ x: x + v.x, y: y + v.y }));
  for (const coord of coords) {
    if (elvesPositions.has(coord)) {
      return false;
    }
  }
  return true;
};

const canMoveToWest = ({ x, y }) => {
  const coords = [DIRECTIONS.NW, DIRECTIONS.W, DIRECTIONS.SW].map((v) => coordsToString({ x: x + v.x, y: y + v.y }));
  for (const coord of coords) {
    if (elvesPositions.has(coord)) {
      return false;
    }
  }
  return true;
};

const canMoveToEast = ({ x, y }) => {
  const coords = [DIRECTIONS.NE, DIRECTIONS.E, DIRECTIONS.SE].map((v) => coordsToString({ x: x + v.x, y: y + v.y }));
  for (const coord of coords) {
    if (elvesPositions.has(coord)) {
      return false;
    }
  }
  return true;
};

const MOVING_PRIORITY = [
  { canMove: canMoveToNorth, move: DIRECTIONS.N },
  { canMove: canMoveToSouth, move: DIRECTIONS.S },
  { canMove: canMoveToWest, move: DIRECTIONS.W },
  { canMove: canMoveToEast, move: DIRECTIONS.E },
];

const playRound = (n) => {
  const movingProposal = new Map();
  for (const elfPosition of elvesPositions) {
    const [x, y] = elfPosition.split(';').map(Number);
    if (hasNeighbors({ x, y })) {
      let move = null;
      for (let i = 0; i < 4; i++) {
        const direction = MOVING_PRIORITY[(n + i) % 4];
        if (direction.canMove({ x, y })) {
          move = direction.move;
          break;
        }
      }
      if (move) {
        const nextPosition = coordsToString({ x: x + move.x, y: y + move.y });
        if (movingProposal.has(nextPosition)) {
          movingProposal.get(nextPosition).push(elfPosition);
        } else {
          movingProposal.set(nextPosition, [elfPosition]);
        }
      }
    }
  }
  for (const [nextPosition, pretenders] of movingProposal.entries()) {
    if (pretenders.length === 1) {
      elvesPositions.delete(pretenders[0]);
      elvesPositions.add(nextPosition);
    }
  }
};

const getCoordInteval = () => {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (const elfPosition of elvesPositions) {
    const [x, y] = elfPosition.split(';').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  return { minX, maxX, minY, maxY };
};

const printElvesPositions = () => {
  const { minX, maxX, minY, maxY } = getCoordInteval();
  for (let i = minY; i <= maxY; i++) {
    for (let j = minX; j <= maxX; j++) {
      if (elvesPositions.has(coordsToString({ x: j, y: i }))) {
        process.stdout.write('#');
      } else {
        process.stdout.write('.');
      }
    }
    process.stdout.write('\n');
  }
};

const elvesPositions = parseData(data);
// console.warn('Initial positions:', {elvesPositions});
// printElvesPositions();
for (let i = 0; i < 10; i++) {
  playRound(i);
  // console.warn('== End of Round', i + 1, '==');
  // printElvesPositions();
}
// console.warn('Final positions:', {elvesPositions});
// printElvesPositions();
const { minX, maxX, minY, maxY } = getCoordInteval();

answer = (maxX - minX + 1) * (maxY - minY + 1) - elvesPositions.size;
