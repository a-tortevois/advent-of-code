// Part 1

const parseInput = () => {
  const [instructions, rawCoordinates] = input.split('\n\n');

  const regex = /([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/;
  const coordinates = {};
  for (const line of rawCoordinates.split('\n')) {
    const matches = regex.exec(line);
    coordinates[matches[1]] = {
      L: matches[2],
      R: matches[3]
    };
  }

  return {
    instructions: instructions.split(''),
    coordinates
  };
};

const main = () => {
  const { instructions, coordinates } = parseInput();
  let coordinate = 'AAA';
  let step = -1;
  while (coordinate !== 'ZZZ') {
    step++;
    const nextInstruction = instructions[step % instructions.length];
    coordinate = coordinates[coordinate][nextInstruction];
  }
  return step + 1;
};

answer = main(); // 19631
