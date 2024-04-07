// Part 2

const [cratesInput, movesInput] = input.split('\n\n').map((v) => v.split('\n'));

const parseCratesInput = (cratesInput) => {
  const stackCount = [...cratesInput[0].matchAll(/(\d)/g)];
  cratesInput.shift(); // Remove numbers
  const cratesStack = new Array(stackCount.length);
  for (let i = 0; i < stackCount.length; i++) {
    cratesStack[i] = [];
  }
  for (const i in cratesInput) {
    for (const match of stackCount) {
      const index = Number.parseInt(match[1], 10) - 1;
      const name = cratesInput[i].charAt(match.index);
      if (name !== ' ') {
        cratesStack[index].push(name);
      }
    }
  }
  return cratesStack;
};

const parseMovesInput = (movesInput) => {
  const moves = [];
  for (const move of movesInput) {
    const [crateCount, from, to] = move.match(/\d+/g);
    moves.push({ crateCount: Number.parseInt(crateCount, 10), from: from - 1, to: to - 1 });
  }
  return moves;
};

const applyMoves = (moves, cratesStack) => {
  for (const { crateCount, from, to } of moves) {
    const stackToMove = cratesStack[from].splice(-crateCount);
    cratesStack[to].push(...stackToMove);
  }
};

const getAllTopCrates = (cratesStack) => {
  let buffer = '';
  for (const crates of cratesStack) {
    buffer += crates.pop();
  }
  return buffer;
};

const cratesStack = parseCratesInput(cratesInput.reverse());
const moves = parseMovesInput(movesInput);
applyMoves(moves, cratesStack);

answer = getAllTopCrates(cratesStack);
