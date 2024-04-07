// Part 1

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

const searchPossibleReflectionPoints = (array) => {
  const possibleReflectionPoints = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === array[i + 1]) {
      possibleReflectionPoints.push(i + 1);
    }
  }
  return possibleReflectionPoints;
};

const getReflectionPoint = (array) => {
  const possibleReflectionPoints = searchPossibleReflectionPoints(array);
  const reflectionPoint = [];
  for (const possibleReflectionPoint of possibleReflectionPoints) {
    const p1 = array.slice(0, possibleReflectionPoint).join('');
    const p2 = array.slice(possibleReflectionPoint).reverse().join('');
    if (p1.length < p2.length) {
      if (p2.endsWith(p1)) {
        reflectionPoint.push(possibleReflectionPoint);
      }
    } else if (p1.endsWith(p2)) {
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

answer = main(); // 28651
