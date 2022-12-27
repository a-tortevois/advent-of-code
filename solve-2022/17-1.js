// Part 1

const data = input;

const ROOM_WIDE = 7;
const LEFT_OFFSET = 2;
const UP_OFFSET = 3;
const BLOCK_COUNT = 2022;

const parts = [
  {
    // ####
    height: 1,
    rocks: [[0, 0], [1, 0], [2, 0], [3, 0]]
  },
  {
    // .#.
    // ###
    // .#.
    height: 3,
    rocks: [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2]
    ]
  },
  {
    // ..#
    // ..#
    // ###
    height: 3,
    rocks: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2]
    ]
  },
  {
    // #
    // #
    // #
    // #
    height: 4,
    rocks: [[0, 0], [0, 1], [0, 2], [0, 3]]
  },
  {
    // ##
    // ##
    height: 2,
    rocks: [[0, 0], [0, 1], [1, 0], [1, 1]]
  }
];

const parseData = (data) => data.split('');

const getPart = (n) => parts[n];

const getRow = () => Array.from({ length: ROOM_WIDE }, () => '.');

const getMove = (n) => moves[n % moves.length];

const canMoveLeft = (rocks, fromCoord) => {
  for (const e in rocks) {
    const coordElem = {
      x: fromCoord.x + rocks[e][0],
      y: fromCoord.y - rocks[e][1]
    };
    if (coordElem.x - 1 < 0 || grid[coordElem.y][coordElem.x - 1] === '#') {
      return false;
    }
  }
  return true;
};

const canMoveRight = (rocks, fromCoord) => {
  for (const e in rocks) {
    const coordElem = {
      x: fromCoord.x + rocks[e][0],
      y: fromCoord.y - rocks[e][1]
    };
    if (coordElem.x + 1 > ROOM_WIDE - 1 || grid[coordElem.y][coordElem.x + 1] === '#') {
      return false;
    }
  }
  return true;
};

const canMoveDown = (rocks, fromCoord) => {
  for (const e in rocks) {
    const coordElem = {
      x: fromCoord.x + rocks[e][0],
      y: fromCoord.y - rocks[e][1]
    };
    if (coordElem.y + 1 > grid.length - 1 || grid[coordElem.y + 1][coordElem.x] === '#') {
      return false;
    }
  }
  return true;
};

const putBlock = (rocks, fromCoord) => {
  for (const e in rocks) {
    const coordElem = {
      x: fromCoord.x + rocks[e][0],
      y: fromCoord.y - rocks[e][1]
    };
    grid[coordElem.y][coordElem.x] = '#';
  }
};

const printGrid = (part = null, fromCoord = null) => {
  for (let i = 0; i < grid.length; i++) {
    if (!part || i > fromCoord.y || i < fromCoord.y - part.height + 1) {
      console.warn(i.toString().padStart(4, ' '), grid[i].join(''));
    } else {
      const row = Array.from(grid[i]);
      for (const e in part.rocks) {
        const coordElem = {
          x: fromCoord.x + part.rocks[e][0],
          y: fromCoord.y - part.rocks[e][1]
        };
        if (coordElem.y === i) {
          row[coordElem.x] = '@';
        }
      }
      console.warn(i.toString().padStart(4, ' '), row.join(''));
    }
  }
  console.warn('------------');
};

const runFallingPart = (blocNum, iter, lastHighestRock) => {
  while (blocNum < BLOCK_COUNT) {
    const part = getPart(blocNum % parts.length);
    const rowsToAdd = lastHighestRock - UP_OFFSET - part.height;
    for (let i = 0; i > rowsToAdd; i--) {
      grid.unshift(getRow());
      lastHighestRock++;
    }
    const fromCoord = {
      x: LEFT_OFFSET,
      y: lastHighestRock - UP_OFFSET - 1
    };
    while (true) {
      const move = getMove(iter);
      iter++;
      switch (move) {
        case '>': {
          if (canMoveRight(part.rocks, fromCoord)) {
            fromCoord.x++;
          }
          break;
        }
        case '<': {
          if (canMoveLeft(part.rocks, fromCoord)) {
            fromCoord.x--;
          }
          break;
        }
        default: {
          throw new Error('Unknown move:', move);
        }
      }
      if (canMoveDown(part.rocks, fromCoord)) {
        fromCoord.y++;
      } else {
        putBlock(part.rocks, fromCoord);
        lastHighestRock = Math.min(lastHighestRock, fromCoord.y - part.height + 1);
        break;
      }
    }
    blocNum++;
  }
  return grid.length - lastHighestRock;
};

const moves = parseData(data);
const grid = Array.from({ length: UP_OFFSET }, getRow);

answer = runFallingPart(0, 0, UP_OFFSET);
