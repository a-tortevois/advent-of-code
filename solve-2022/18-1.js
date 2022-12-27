// Part 1

const data = input;

const LAVA = Symbol('lava');
const AIR = Symbol('air');

const parseData = (data) => {
  const points = data.split('\n').map((v) => v.split(',')).map((c) => {
    return {
      x: Number(c[0]),
      y: Number(c[1]),
      z: Number(c[2])
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

const isValidCoord = ({ x, y, z }) => (x >= 0 && x < W && y >= 0 && y < H && z >= 0 && z < D);

const getNeighbours = ({ x, y, z }, filteredBy) => [
  { x: x - 1, y, z },
  { x: x + 1, y, z },
  { x, y: y - 1, z },
  { x, y: y + 1, z },
  { x, y, z: z - 1 },
  { x, y, z: z + 1 }
].filter((coord) => isValidCoord(coord)).filter(({ x, y, z }) => matrix[x][y][z] === filteredBy);

const [matrix, W, H, D] = parseData(data);
let sum = 0;
for (let x = 0; x < W; x++) {
  for (let y = 0; y < H; y++) {
    for (let z = 0; z < D; z++) {
      if (matrix[x][y][z] === LAVA) {
        sum += 6 - getNeighbours({ x, y, z }, LAVA).length;
      }
    }
  }
}

answer = sum;
