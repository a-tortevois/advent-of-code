// Part 1

const parseInput = () => {
  const cards = new Map();
  const regex = /^Card\s+(\d+): ([\d\s]+) \| ([\d\s]+)$/;
  for (const line of input.split('\n')) {
    const result = regex.exec(line);
    const id = Number(result[1]);
    const winningNumbers = result[2].trim().split(/\s+/).map(Number);
    const ownNumbers = result[3].trim().split(/\s+/).map(Number);
    cards.set(id, { winningNumbers, ownNumbers });
  }
  return cards;
};

const getScore = (card) => {
  const winningNumbers = card.winningNumbers.filter((number) => card.ownNumbers.includes(number));
  const score = winningNumbers.length > 0 ? 2 ** Math.max(winningNumbers.length - 1, 0) : 0;
  return score;
};

const main = () => {
  const cards = parseInput();
  let sum = 0;
  for (const card of cards.values()) {
    sum += getScore(card);
  }
  return sum;
};

answer = main(); // 20855
