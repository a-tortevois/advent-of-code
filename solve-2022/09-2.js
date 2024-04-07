// Part 2

const DEBUG = false;
const W = 26; // x => from example
const H = 21; // y => from example
const initPosX = DEBUG ? 11 : 0; // from example
const initPosY = DEBUG ? 15 : 0; // from example

const lines = DEBUG ? example : input;

let Xmin = 0;
let Xmax = 0;
let Ymin = 0;
let Ymax = 0;

const MOVES = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

const visited = new Set();

const knots = Array.from({ length: 10 }, () => {
  return { x: initPosX, y: initPosY };
});

const printGrid = (h, w) => {
  for (let i = 0; i < h; i++) {
    const row = Array.from({ length: w }, () => '.');
    for (let j = 0; j < w; j++) {
      for (const k in knots) {
        if (knots[k].x === j && knots[k].y === i) {
          row[j] = k === '0' ? 'H' : k;
          break;
        }
      }
    }
    console.log(row.join(''));
  }
};

const printVisited = (Xmin, Xmax, Ymin, Ymax) => {
  for (let i = Ymin; i <= Ymax; i++) {
    const row = Array.from({ length: Xmax - Xmin + 1 }, () => '.');
    for (let j = Xmin; j <= Xmax; j++) {
      if (visited.has(`(${j},${i})`)) {
        row[j - Xmin] = '#';
      }
      if (i === 0 && j === 0) {
        row[j - Xmin] = 's';
      }
    }
    console.log(row.join(''));
  }
};

if (DEBUG) {
  console.log('\n== Initial State ==\n');
  printGrid(H, W);
}

const moveKnots = (index) => {
  const head = knots[index - 1];
  const tail = knots[index];
  if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
    tail.x += Math.sign(head.x - tail.x);
    tail.y += Math.sign(head.y - tail.y);
    if (DEBUG) {
      console.log(`move ${index} to (${tail.x};${tail.y})`);
    }
  }
};

const addToVisited = (x, y) => {
  visited.add(`(${x},${y})`);
};

for (const line of lines.split('\n')) {
  if (DEBUG) {
    console.log('\n==', line, '==\n');
  }
  const [dir, _steps] = line.split(' ');
  const steps = Number.parseInt(_steps, 10);
  for (let i = 0; i < steps; i++) {
    knots[0].x += MOVES[dir][0];
    knots[0].y += MOVES[dir][1];

    Xmin = Math.min(Xmin, knots[0].x);
    Xmax = Math.max(Xmax, knots[0].x);
    Ymin = Math.min(Ymin, knots[0].y);
    Ymax = Math.max(Ymax, knots[0].y);

    if (DEBUG) {
      console.log(`move H to (${knots[0].x};${knots[0].y})`);
    }
    for (let index = 1; index < 10; index++) {
      moveKnots(index);
    }
    addToVisited(knots[9].x, knots[9].y);
  }
  if (DEBUG) {
    printGrid(H, W);
  }
}

printVisited(Xmin, Xmax, Ymin, Ymax);

answer = visited.size;
