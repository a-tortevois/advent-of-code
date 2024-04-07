// Part 1

const MOVES = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

const visited = new Set();

const head = {
  x: 0,
  y: 0,
};

const tail = {
  x: 0,
  y: 0,
};

const addToVisited = (x, y) => {
  visited.add(`(${x},${y})`);
};

for (const line of input.split('\n')) {
  const [dir, _steps] = line.split(' ');
  const steps = Number.parseInt(_steps, 10);

  for (let i = 0; i < steps; i++) {
    head.x += MOVES[dir][0];
    head.y += MOVES[dir][1];

    if (dir === 'U' && Math.abs(head.y - tail.y) > 1) {
      tail.x = head.x;
      tail.y++;
    }

    if (dir === 'D' && Math.abs(head.y - tail.y) > 1) {
      tail.x = head.x;
      tail.y--;
    }

    if (dir === 'L' && Math.abs(head.x - tail.x) > 1) {
      tail.x--;
      tail.y = head.y;
    }

    if (dir === 'R' && Math.abs(head.x - tail.x) > 1) {
      tail.x++;
      tail.y = head.y;
    }

    addToVisited(tail.x, tail.y);
  }
}

answer = visited.size;
