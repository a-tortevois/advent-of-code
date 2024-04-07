// Part 2

const EXPANSION_FACTOR = 1_000_000 - 1;
const galaxies = [];
const emptyRows = [];
const emptyCols = [];

const parseInput = () => {
  const rowWithGalaxies = new Set();
  const grid = input.split('\n').map((line, y) => {
    if (!line.includes('#')) {
      if (!emptyRows.includes(y)) {
        emptyRows.push(y);
      }
    } else {
      const matches = [...line.matchAll('#')];
      for (const { index: x } of matches) {
        galaxies.push({ x, y });
        rowWithGalaxies.add(x);
      }
    }
    return line.split('');
  });

  for (let y = 0; y < grid.length; y++) {
    if (!rowWithGalaxies.has(y)) {
      emptyCols.push(y);
    }
  }
};

const getManhattanDistance = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

const getDistanceBetweenGalaxies = (g1, g2) => {
  const [xMin, xMax] = [g1.x, g2.x].sort((a, b) => a - b);
  const [yMin, yMax] = [g1.y, g2.y].sort((a, b) => a - b);
  const xOffset = emptyCols.filter((v) => v > xMin && v < xMax).length;
  const yOffset = emptyRows.filter((v) => v > yMin && v < yMax).length;
  return getManhattanDistance(g1, g2) + (xOffset + yOffset) * EXPANSION_FACTOR;
};

const getAllPairs = () => {
  const pairs = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      pairs.push({
        from: i,
        to: j,
        len: getDistanceBetweenGalaxies(galaxies[i], galaxies[j]),
      });
    }
  }
  return pairs;
};

const main = () => {
  parseInput();
  const pairs = getAllPairs();
  return pairs.reduce((prev, curr) => prev + curr.len, 0);
};

answer = main(); // 447073334102
