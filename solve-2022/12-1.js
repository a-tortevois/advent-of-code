// Part 1

const getElevation = (c) => {
  if (c === 'S') {
    return 0;
  }
  if (c === 'E') {
    return 26;
  }
  return c.codePointAt(0) - 0x61;
};

const parseInput = (lines) => {
  const H = lines.length;
  const W = lines[0].length;
  const grid = new Array(H);
  const startingPoint = {
    x: 0,
    y: 0,
  };
  const exitPoint = {
    x: 0,
    y: 0,
  };
  for (const i in lines) {
    const line = lines[i].split('');
    if (line.includes('S')) {
      startingPoint.x = line.indexOf('S');
      startingPoint.y = Number.parseInt(i, 10);
    }
    if (line.includes('E')) {
      exitPoint.x = line.indexOf('E');
      exitPoint.y = Number.parseInt(i, 10);
    }
    grid[i] = line.map((v) => getElevation(v));
  }
  return [H, W, startingPoint, exitPoint, grid];
};

const isValidCoord = (c) => c.x >= 0 && c.x < W && c.y >= 0 && c.y < H;

const isReachable = (from, to) => grid[from.y][from.x] - grid[to.y][to.x] <= 1; // Use with BFS

const coordToString = (c) => `(${c.x};${c.y})`;

const getNeighbours = (from) =>
  [
    { x: from.x + 1, y: from.y },
    { x: from.x - 1, y: from.y },
    { x: from.x, y: from.y - 1 },
    { x: from.x, y: from.y + 1 },
  ].filter((c) => isValidCoord(c));

// https://en.wikipedia.org/wiki/Breadth-first_search
const BFS = (from) => {
  const toVisit = [from];
  const exploredCoords = new Map();
  exploredCoords.set(coordToString(from), from); // Add the first element to avoid visiting it
  while (toVisit.length > 0) {
    const currentCoord = toVisit.shift();
    const coordsToExplore = getNeighbours(currentCoord)
      .filter((c) => isReachable(currentCoord, c))
      .filter((c) => !exploredCoords.has(coordToString(c)));
    for (const coord of coordsToExplore) {
      toVisit.push(coord);
      exploredCoords.set(coordToString(coord), currentCoord);
    }
  }
  exploredCoords.delete(coordToString(from)); // Remove the first element
  return exploredCoords;
};

const getPathFrom = (from, coordsMap) => {
  const path = [from];
  let target = coordsMap.get(coordToString(from));
  while (target) {
    path.push(target);
    target = coordsMap.get(coordToString(target));
  }
  return path;
};

const [H, W, startingPoint, exitPoint, grid] = parseInput(input.split('\n'));
const coordsMap = BFS(exitPoint);

answer = getPathFrom(startingPoint, coordsMap).length - 1;
