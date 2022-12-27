// Part 1

const grid = [];
for (const line of input.split('\n')) {
  grid.push(line.split('').map(Number));
}
const H = grid.length;
const W = grid[0].length;
const visibleTrees = new Set();

// Create a reverse grid to easily check columns
const reverseGrid = Array.from({ length: W }, () => new Array(H).fill(0));
for (let j = 0; j < H; j++) {
  for (let i = 0; i < W; i++) {
    reverseGrid[i][j] = grid[j][i];
    if (i === 0 || i === W - 1 || j === 0 || j === H - 1) {
      visibleTrees.add(`${i};${j}`);
    }
  }
}

const checkTrees = (trees, x, y, direction) => {
  let height = -1;
  for (let i = 0; i < trees.length; i++) {
    if (trees[i] > height) {
      height = trees[i];
      switch (direction) {
        case 'L': {
          visibleTrees.add(`${i};${y}`);
          break;
        }
        case 'R': {
          visibleTrees.add(`${W - 1 - i};${y}`);
          break;
        }
        case 'U': {
          visibleTrees.add(`${x};${i}`);
          break;
        }
        case 'D': {
          visibleTrees.add(`${x};${H - 1 - i}`);
          break;
        }
        default: {
          throw new Error('Unknown direction:', direction);
        }
      }
    }
  }
};

const checkVisibilityFromTree = (x, y) => {
  if (!visibleTrees.has(`${x};${y}`)) {
    const leftTrees = grid[y].slice(0, x + 1);
    checkTrees(leftTrees, x, y, 'L');
    const rightTrees = grid[y].slice(x).reverse();
    checkTrees(rightTrees, x, y, 'R');
    const upTrees = reverseGrid[x].slice(0, y + 1);
    checkTrees(upTrees, x, y, 'U');
    const downTrees = reverseGrid[x].slice(y).reverse();
    checkTrees(downTrees, x, y, 'D');
  }
};

for (let j = 0; j < H; j++) {
  for (let i = 0; i < W; i++) {
    checkVisibilityFromTree(i, j);
  }
}

answer = visibleTrees.size;
