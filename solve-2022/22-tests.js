const H = 200;
const W = 150;
const S = 50;

const getNext = (nextX, nextY, nextFacing) => {
  if (nextX < 0) {
    if (nextY < S * 3) {
      // From 2W to 5W
      nextX = S;
      nextY = S * 3 - 1 - nextY;
      nextFacing = 0;
    } else {
      // From 1W to 5N
      nextX = S + (nextY - S * 3);
      nextY = 0;
      nextFacing = 1;
    }
  } else if (nextX >= W) {
    // From 6E to 3E
    nextX = S * 2 - 1;
    nextY = S * 2 + (S - 1 - nextY);
    nextFacing = 2;
  } else if (nextY < 0) {
    if (nextX < S * 2) {
      // From 5N to 1W
      nextY = S * 3 + (nextX - S);
      nextX = 0;
      nextFacing = 0;
    } else {
      // From 6N to 1S
      nextX -= S * 2;
      nextY = H - 1;
    }
  } else if (nextY >= H) {
    // From 1S to 6N
    nextX += S * 2;
    nextY = 0;
  } else if (nextX === S - 1 && nextFacing === 2) {
    if (nextY < S) {
      // From 5W to 2W
      nextX = 0;
      nextY = S * 2 + (S - 1 - nextY);
      nextFacing = 0;
    } else {
      // From 4W to 2N
      nextX = nextY - S;
      nextY = S * 2;
      nextFacing = 1;
    }
  } else if (nextX === S && nextFacing === 0) {
    // From 1E to 3S
    nextX = S + (nextY - S * 3);
    nextY = S * 3 - 1;
    nextFacing = 3;
  } else if (nextX === S * 2 && nextFacing === 0) {
    if (nextY < S * 2) {
      // From 4E to 6S
      nextX = S * 2 + (nextY - S);
      nextY = S - 1;
      nextFacing = 3;
    } else {
      // From 3E to 6E
      nextX = W - 1;
      nextY = S * 3 - 1 - nextY;
      nextFacing = 2;
    }
  } else if (nextY === S && nextFacing === 1) {
    // From 6S to 4E
    nextY = S + (nextX - S * 2);
    nextX = S * 2 - 1;
    nextFacing = 2;
  } else if (nextY === S * 2 - 1 && nextFacing === 3) {
    // From 2N to 4W
    nextY = S + nextX;
    nextX = S;
    nextFacing = 0;
  } else if (nextY === S * 3 && nextFacing === 1) {
    // From 3S to 1E
    nextY = S * 3 + (nextX - S);
    nextX = S - 1;
    nextFacing = 2;
  } else {
    console.error('Error: unknown case', { nextX, nextY, nextFacing });
    process.exit();
  }
  return { nextX, nextY, nextFacing };
};

const assertCoordsEquals = (found, expected) => found.nextX === expected.nextX && found.nextY === expected.nextY && found.nextFacing === expected.nextFacing;

let found;

// From 6E to 3E
console.warn('test From 6E to 3E');
console.warn('next move after 149;0 0 is', (found = getNext(150, 0, 0)), assertCoordsEquals(found, { nextX: 99, nextY: 149, nextFacing: 2 }));
console.warn('next move after 149;25 0 is', (found = getNext(150, 25, 0)), assertCoordsEquals(found, { nextX: 99, nextY: 124, nextFacing: 2 }));
console.warn('next move after 149;49 0 is', (found = getNext(150, 49, 0)), assertCoordsEquals(found, { nextX: 99, nextY: 100, nextFacing: 2 }));

// From 4E to 6S
console.warn('test From 4E to 6S');
console.warn('next move after 99;50 0 is', (found = getNext(100, 50, 0)), assertCoordsEquals(found, { nextX: 100, nextY: 49, nextFacing: 3 }));
console.warn('next move after 99;75 0 is', (found = getNext(100, 75, 0)), assertCoordsEquals(found, { nextX: 125, nextY: 49, nextFacing: 3 }));
console.warn('next move after 99;99 0 is', (found = getNext(100, 99, 0)), assertCoordsEquals(found, { nextX: 149, nextY: 49, nextFacing: 3 }));
// From 3E to 6E
console.warn('test From 3E to 6E');
console.warn('next move after 99;100 0 is', (found = getNext(100, 100, 0)), assertCoordsEquals(found, { nextX: 149, nextY: 49, nextFacing: 2 }));
console.warn('next move after 99;125 0 is', (found = getNext(100, 125, 0)), assertCoordsEquals(found, { nextX: 149, nextY: 24, nextFacing: 2 }));
console.warn('next move after 99;149 0 is', (found = getNext(100, 149, 0)), assertCoordsEquals(found, { nextX: 149, nextY: 0, nextFacing: 2 }));
// From 1E to 3S
console.warn('test From 1E to 3S');
console.warn('next move after 49;150 0 is', (found = getNext(50, 150, 0)), assertCoordsEquals(found, { nextX: 50, nextY: 149, nextFacing: 3 }));
console.warn('next move after 49;175 0 is', (found = getNext(50, 175, 0)), assertCoordsEquals(found, { nextX: 75, nextY: 149, nextFacing: 3 }));
console.warn('next move after 49;199 0 is', (found = getNext(50, 199, 0)), assertCoordsEquals(found, { nextX: 99, nextY: 149, nextFacing: 3 }));

// From 5W to 2W
console.warn('test From 5W to 2W');
console.warn('next move after 50;0 2 is', (found = getNext(49, 0, 2)), assertCoordsEquals(found, { nextX: 0, nextY: 149, nextFacing: 0 }));
console.warn('next move after 50;25 2 is', (found = getNext(49, 25, 2)), assertCoordsEquals(found, { nextX: 0, nextY: 124, nextFacing: 0 }));
console.warn('next move after 50;49 2 is', (found = getNext(49, 49, 2)), assertCoordsEquals(found, { nextX: 0, nextY: 100, nextFacing: 0 }));

// From 4W to 2N
console.warn('test From 4W to 2N');
console.warn('next move after 50;50 2 is', (found = getNext(49, 50, 2)), assertCoordsEquals(found, { nextX: 0, nextY: 100, nextFacing: 1 }));
console.warn('next move after 50;75 2 is', (found = getNext(49, 75, 2)), assertCoordsEquals(found, { nextX: 25, nextY: 100, nextFacing: 1 }));
console.warn('next move after 50;99 2 is', (found = getNext(49, 99, 2)), assertCoordsEquals(found, { nextX: 49, nextY: 100, nextFacing: 1 }));

// From 2W to 5W
console.warn('test From 2W to 5W');
console.warn('next move after 0;100 2 is', (found = getNext(-1, 100, 2)), assertCoordsEquals(found, { nextX: 50, nextY: 49, nextFacing: 0 }));
console.warn('next move after 0;125 2 is', (found = getNext(-1, 125, 2)), assertCoordsEquals(found, { nextX: 50, nextY: 24, nextFacing: 0 }));
console.warn('next move after 0;149 2 is', (found = getNext(-1, 149, 2)), assertCoordsEquals(found, { nextX: 50, nextY: 0, nextFacing: 0 }));

// From 1W to 5N
console.warn('test From 1W to 5N');
console.warn('next move after 0;150 2 is', (found = getNext(-1, 150, 2)), assertCoordsEquals(found, { nextX: 50, nextY: 0, nextFacing: 1 }));
console.warn('next move after 0;175 2 is', (found = getNext(-1, 175, 2)), assertCoordsEquals(found, { nextX: 75, nextY: 0, nextFacing: 1 }));
console.warn('next move after 0;199 2 is', (found = getNext(-1, 199, 2)), assertCoordsEquals(found, { nextX: 99, nextY: 0, nextFacing: 1 }));

// From 1S to 6N
console.warn('test From 1S to 6N');
console.warn('next move after 0;199 1 is', (found = getNext(0, 200, 1)), assertCoordsEquals(found, { nextX: 100, nextY: 0, nextFacing: 1 }));
console.warn('next move after 25;199 1 is', (found = getNext(25, 200, 1)), assertCoordsEquals(found, { nextX: 125, nextY: 0, nextFacing: 1 }));
console.warn('next move after 49;199 1 is', (found = getNext(49, 200, 1)), assertCoordsEquals(found, { nextX: 149, nextY: 0, nextFacing: 1 }));

// From 3S to 1E
console.warn('test From 3S to 1E');
console.warn('next move after 50;149 1 is', (found = getNext(50, 150, 1)), assertCoordsEquals(found, { nextX: 49, nextY: 150, nextFacing: 2 }));
console.warn('next move after 75;149 1 is', (found = getNext(75, 150, 1)), assertCoordsEquals(found, { nextX: 49, nextY: 175, nextFacing: 2 }));
console.warn('next move after 99;149 1 is', (found = getNext(99, 150, 1)), assertCoordsEquals(found, { nextX: 49, nextY: 199, nextFacing: 2 }));

// From 6S to 4E
console.warn('test From 6S to 4E');
console.warn('next move after 100;49 1 is', (found = getNext(100, 50, 1)), assertCoordsEquals(found, { nextX: 99, nextY: 50, nextFacing: 2 }));
console.warn('next move after 125;49 1 is', (found = getNext(125, 50, 1)), assertCoordsEquals(found, { nextX: 99, nextY: 75, nextFacing: 2 }));
console.warn('next move after 149;49 1 is', (found = getNext(149, 50, 1)), assertCoordsEquals(found, { nextX: 99, nextY: 99, nextFacing: 2 }));

// From 2N to 4W
console.warn('test From 2N to 4W');
console.warn('next move after 0;100 3 is', (found = getNext(0, 99, 3)), assertCoordsEquals(found, { nextX: 50, nextY: 50, nextFacing: 0 }));
console.warn('next move after 25;100 3 is', (found = getNext(25, 99, 3)), assertCoordsEquals(found, { nextX: 50, nextY: 75, nextFacing: 0 }));
console.warn('next move after 49;100 3 is', (found = getNext(49, 99, 3)), assertCoordsEquals(found, { nextX: 50, nextY: 99, nextFacing: 0 }));

// From 5N to 1W
console.warn('test From 5N to 1W');
console.warn('next move after 50;0 3 is', (found = getNext(50, -1, 3)), assertCoordsEquals(found, { nextX: 0, nextY: 150, nextFacing: 0 }));
console.warn('next move after 75;0 3 is', (found = getNext(75, -1, 3)), assertCoordsEquals(found, { nextX: 0, nextY: 175, nextFacing: 0 }));
console.warn('next move after 99;0 3 is', (found = getNext(99, -1, 3)), assertCoordsEquals(found, { nextX: 0, nextY: 199, nextFacing: 0 }));

// From 6N to 1S
console.warn('test From 6N to 1S');
console.warn('next move after 100;0 3 is', (found = getNext(100, -1, 3)), assertCoordsEquals(found, { nextX: 0, nextY: 199, nextFacing: 3 }));
console.warn('next move after 125;0 3 is', (found = getNext(125, -1, 3)), assertCoordsEquals(found, { nextX: 25, nextY: 199, nextFacing: 3 }));
console.warn('next move after 149;0 3 is', (found = getNext(149, -1, 3)), assertCoordsEquals(found, { nextX: 49, nextY: 199, nextFacing: 3 }));
