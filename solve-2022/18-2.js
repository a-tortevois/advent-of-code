// Part 2

const data = input;

const LAVA = Symbol('lava');
const AIR = Symbol('air');

const parseData = (data) => {
  const points = data
    .split('\n')
    .map((v) => v.split(','))
    .map((c) => {
      return {
        x: Number(c[0]),
        y: Number(c[1]),
        z: Number(c[2]),
      };
    });

  const [W, H, D] = getAxisDimensions(points);

  const matrix = Array.from({ length: W }, () => Array.from({ length: H }, () => new Array(D).fill(AIR)));

  for (const p of points) {
    matrix[p.x][p.y][p.z] = LAVA;
  }

  return [matrix, W, H, D];
};

const getAxisDimensions = (points) => ['x', 'y', 'z'].map((axe) => Math.max(...points.map((c) => c[axe])) + 1);

const isValidCoord = ({ x, y, z }) => x >= 0 && x < W && y >= 0 && y < H && z >= 0 && z < D;

const getNeighbours = ({ x, y, z }, filteredBy) =>
  [
    { x: x - 1, y, z },
    { x: x + 1, y, z },
    { x, y: y - 1, z },
    { x, y: y + 1, z },
    { x, y, z: z - 1 },
    { x, y, z: z + 1 },
  ]
    .filter((coord) => isValidCoord(coord))
    .filter(({ x, y, z }) => matrix[x][y][z] === filteredBy);

const coordToString = ({ x, y, z }) => `(${x};${y};${z})`;

const isOnBorder = ({ x, y, z }) => x === 0 || x === W - 1 || y === 0 || y === H - 1 || (z === 0 && z === D - 1);

const BFS = (from, visited) => {
  const hash = coordToString(from);
  if (visited.has(hash)) {
    return 0;
  }
  visited.add(hash);
  if (isOnBorder(from)) {
    return 0;
  }
  const cubesToVisit = [from];
  const exploredCubes = new Map();
  exploredCubes.set(hash, getNeighbours(from, LAVA).length); // Add the first element to avoid visiting it
  while (cubesToVisit.length > 0) {
    const currentCube = cubesToVisit.shift();
    const cubesToExplore = getNeighbours(currentCube, AIR);
    for (const cube of cubesToExplore) {
      if (exploredCubes.has(coordToString(cube))) {
        continue;
      }
      visited.add(coordToString(cube));
      if (isOnBorder(cube)) {
        return 0;
      }
      cubesToVisit.push(cube);
      exploredCubes.set(coordToString(cube), getNeighbours(cube, LAVA).length);
    }
  }
  return [...exploredCubes.values()].reduce((acc, val) => acc + val, 0);
};

const [matrix, W, H, D] = parseData(data);
let sum = 0;
const visited = new Set();
for (let x = 0; x < W; x++) {
  for (let y = 0; y < H; y++) {
    for (let z = 0; z < D; z++) {
      if (matrix[x][y][z] === LAVA) {
        sum += 6 - getNeighbours({ x, y, z }, LAVA).length;
      } else {
        sum -= BFS({ x, y, z }, visited);
      }
    }
  }
}

answer = sum;
