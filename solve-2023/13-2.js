// Part 2

const parseInput = () => {
  const blocks = [];
  for (const block of input.split('\n\n').map((line) => line.split('\n'))) {
    // For horizontal comparaison (rows)
    const rows = block;

    // Inverted blocks, for vertical comparison (columns)
    const columns = [];
    for (let i = 0; i < block[0].length; i++) {
      const line = [];
      for (let j = 0; j < block.length; j++) {
        line.push(block[j][i]);
      }
      columns.push(line.join(''));
    }

    blocks.push({ rows, columns });
  }
  return blocks;
};

const lineToNum = (line) => Number.parseInt(line.replaceAll('.', '0').replaceAll('#', '1'), 2);

const getErrors = (line1, line2) => {
  const n1 = lineToNum(line1);
  const n2 = lineToNum(line2);
  let xor = n1 ^ n2;
  let errors = 0;
  while (xor) {
    errors += xor & 1;
    xor >>= 1;
  }
  // const errors = xor.toString(2).split('').reduce((prev, curr) => prev + Number(curr), 0);
  return errors;
};

const isPossiblySmudged = (line1, line2) => getErrors(line1, line2) === 1;

const searchPossibleReflectionPoints = (array) => {
  const possibleReflectionPoints = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === array[i + 1]) {
      possibleReflectionPoints.push(i + 1);
    } else if (isPossiblySmudged(array[i], array[i + 1])) {
      possibleReflectionPoints.push(i + 1);
    }
  }
  return possibleReflectionPoints;
};

const getReflectionPoint = (array) => {
  const possibleReflectionPoints = searchPossibleReflectionPoints(array);
  const reflectionPoint = [];
  for (const possibleReflectionPoint of possibleReflectionPoints) {
    let errors = 0;
    const nIter = Math.min(array.length - possibleReflectionPoint, possibleReflectionPoint);
    for (let i = 0; i < nIter; i++) {
      const line1 = array[possibleReflectionPoint - 1 - i];
      const line2 = array[possibleReflectionPoint + i];
      if (line1 === line2) {
        continue;
      }
      errors += getErrors(line1, line2);
      if (errors > 2) {
        break;
      }
    }
    if (errors === 1) {
      reflectionPoint.push(possibleReflectionPoint);
    }
  }
  if (reflectionPoint.length > 1) {
    throw new Error('Found more than one reflection point');
  }
  return reflectionPoint[0] ?? 0;
};

const main = () => {
  const blocks = parseInput();
  let sum = 0;
  for (const { rows, columns } of blocks) {
    const hReflectionPoint = getReflectionPoint(rows);
    const vReflectionPoint = getReflectionPoint(columns);
    if (Boolean(hReflectionPoint) + Boolean(vReflectionPoint) === 0) {
      throw new Error('No reflection point found (horizontal + vertical)');
    }
    if (Boolean(hReflectionPoint) + Boolean(vReflectionPoint) > 1) {
      throw new Error('Found more than one reflection point (horizontal + vertical)');
    }
    sum += 100 * hReflectionPoint;
    sum += vReflectionPoint;
  }
  return sum;
};

answer = main(); // 25450
