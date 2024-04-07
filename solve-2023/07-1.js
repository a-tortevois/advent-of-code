// Part 1

const CARDS_COUNT = 5;

const CARD_VALUES = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const HAND_VALUES = {
  5: 7, // Five of a kind
  41: 6, // Four of a kind
  32: 5, // Full house
  311: 4, // Three of a kind
  221: 3, // Two pair
  2111: 2, // One pair
  11111: 1, // High card
};

const parseInput = () =>
  input.split('\n').map((line) => {
    const [cards, bid] = line.split(' ');
    return {
      cards: cards.split(''),
      bid: Number(bid),
    };
  });

const compareHands = (a, b) => {
  const hashDiff = HAND_VALUES[a.hash] - HAND_VALUES[b.hash];
  if (hashDiff < 0) {
    return Number.NEGATIVE_INFINITY;
  }
  if (hashDiff > 0) {
    return Number.POSITIVE_INFINITY;
  }
  for (let i = 0; i < 5; i++) {
    if (a.cards[i] === b.cards[i]) {
      continue;
    }
    return CARD_VALUES[a.cards[i]] - CARD_VALUES[b.cards[i]];
  }
};

const getHash = (cardsMap) =>
  Number(
    Object.entries(cardsMap)
      .sort((a, b) => {
        const countDiff = b[1] - a[1];
        if (countDiff < 0) {
          return Number.NEGATIVE_INFINITY;
        }
        if (countDiff > 0) {
          return Number.POSITIVE_INFINITY;
        }
        return CARD_VALUES[b[0]] - CARD_VALUES[a[0]];
      })
      .reduce((prev, curr) => prev.concat(String(curr[1])), ''),
  );

const main = () => {
  const hands = parseInput();
  for (const hand of hands) {
    const cardsMap = {};
    for (const card of hand.cards) {
      if (!(card in cardsMap)) {
        cardsMap[card] = 0;
      }
      cardsMap[card]++;
    }
    hand.hash = getHash(cardsMap);
  }

  return hands.sort(compareHands).reduce((prev, curr, index) => prev + (index + 1) * curr.bid, 0);
};

answer = main(); // 249390788
