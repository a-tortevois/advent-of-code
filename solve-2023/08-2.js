// Part 2

const parseInput = () => {
  const [instructions, rawCoordinates] = input.split('\n\n');

  const regex = /([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/;
  const coordinates = {};
  for (const line of rawCoordinates.split('\n')) {
    const matches = regex.exec(line);
    coordinates[matches[1]] = {
      L: matches[2],
      R: matches[3],
    };
  }

  return {
    instructions: instructions.split(''),
    coordinates,
  };
};

// const getGhostCoordinate = (coordinate, index) => coordinate.at(-1).padStart(3, index + 1);

const gcd = (...nums) => nums.reduce((acc, n) => (!n ? acc : gcd(n, acc % n)));

const lcm = (...nums) => nums.reduce((acc, n) => (acc * n) / gcd(acc, n));

const main = () => {
  const { instructions, coordinates } = parseInput();
  const coordinatesList = Object.keys(coordinates);
  const startingCoordinates = coordinatesList.filter((coordinate) => coordinate.endsWith('A'));
  // const ghostCoordinates = new Map();
  // for (const coordinate of coordinatesList) {
  //   ghostCoordinates.set(coordinate, null);
  // }
  // for (const [index, coordinate] of endsWithA.entries()) {
  //   ghostCoordinates.set(coordinate, getGhostCoordinate(coordinate, index));
  // }
  const paths = new Array(startingCoordinates.length).map(() => 0);
  for (let i = 0; i < startingCoordinates.length; i++) {
    let coordinate = startingCoordinates[i];
    let step = -1;
    while (!coordinate.endsWith('Z')) {
      step++;
      const nextInstruction = instructions[step % instructions.length];
      coordinate = coordinates[coordinate][nextInstruction];
      // Unuseful check
      // const ghostCoordinate = getGhostCoordinate(coordinate, i);
      // const ghostCoordinateInMemory = ghostCoordinates.get(coordinate);
      // if (ghostCoordinateInMemory !== null && ghostCoordinateInMemory !== ghostCoordinate) {
      //   console.warn('Warning:', coordinate, 'was', ghostCoordinateInMemory, ' and will be update to', ghostCoordinate);
      // } else {
      //   ghostCoordinates.set(coordinate, ghostCoordinate);
      // }
    }
    paths[i] = step + 1;
  }
  return lcm(...paths);
};

answer = main(); // 21003205388413
