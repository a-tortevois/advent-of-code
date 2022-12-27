// Part 2

const grid = [];
for (const line of input.split('\n')) {
  grid.push(line.split('').map(Number));
}
const H = grid.length;
const W = grid[0].length;

// Create a reverse grid to easily check columns
const reverseGrid = Array.from({ length: W }, () => new Array(H).fill(0));
for (let j = 0; j < H; j++) {
  for (let i = 0; i < W; i++) {
    reverseGrid[i][j] = grid[j][i];
  }
}

const getScore = (trees) => {
  let score = 0;
  const height = trees.shift();
  for (let i = 0; i < trees.length; i++) {
    score++;
    if (trees[i] >= height) {
      break;
    }
  }
  return score;
};

const getScenicScore = (x, y) => {
  let score = 1;
  const leftTrees = grid[y].slice(0, x + 1).reverse();
  score *= getScore(leftTrees);
  const rightTrees = grid[y].slice(x);
  score *= getScore(rightTrees);
  const upTrees = reverseGrid[x].slice(0, y + 1).reverse();
  score *= getScore(upTrees);
  const downTrees = reverseGrid[x].slice(y);
  score *= getScore(downTrees);
  return score;
};

let idealTreeScenicScore = Number.NEGATIVE_INFINITY;
for (let j = 1; j < H - 1; j++) {
  for (let i = 1; i < W - 1; i++) {
    idealTreeScenicScore = Math.max(idealTreeScenicScore, getScenicScore(i, j));
  }
}

answer = idealTreeScenicScore;
