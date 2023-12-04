// Part 2

const parseInput = () => {
  const cards = new Map();
  const regex = /^Card\s+(\d+): ([\d\s]+) \| ([\d\s]+)$/;
  for (const line of input.split('\n')) {
    const result = regex.exec(line);
    const id = Number(result[1]);
    const winningNumbers = result[2].trim().split(/\s+/).map(Number);
    const ownNumbers = result[3].trim().split(/\s+/).map(Number);
    cards.set(id, { winningNumbers, ownNumbers, copies: 1 });
  }
  return cards;
};

const getScore = ({ winningNumbers, ownNumbers }) => winningNumbers.filter((number) => ownNumbers.includes(number)).length;

const main = () => {
  const cards = parseInput();
  let sum = 0;
  for (const [id, card] of cards.entries()) {
    const matching = getScore(card);
    for (let i = id + 1; i <= Math.min(cards.size, id + matching); i++) {
      cards.get(i).copies += card.copies;
    }
    sum += card.copies;
  }
  return sum;
};

answer = main(); // 5489600
