// Part 2

const CARDS_COUNT = 5;

const CARD_VALUES = {
  'J': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'Q': 12,
  'K': 13,
  'A': 14
};

const HAND_VALUES = {
  '5': 7, // Five of a kind
  '41': 6, // Four of a kind
  '32': 5, // Full house
  '311': 4, // Three of a kind
  '221': 3, // Two pair
  '2111': 2, // One pair
  '11111': 1 // High card
};

const parseInput = () => input.split('\n').map((line) => { // input example
  const [cards, bid] = line.split(' ');
  return {
    cards: cards.split(''),
    bid: Number(bid)
  };
});

const compareHands = (a, b) => {
  const hashDiff = HAND_VALUES[a.hash] - HAND_VALUES[b.hash];
  if (hashDiff < 0) {
    return Number.NEGATIVE_INFINITY;
  } else if (hashDiff > 0) {
    return Number.POSITIVE_INFINITY;
  }
  for (let i = 0; i < 5; i++) {
    if (a.cards[i] === b.cards[i]) {
      continue;
    }
    return CARD_VALUES[a.cards[i]] - CARD_VALUES[b.cards[i]];
  }
};

const comparePossibleHands = (a, b) => {
  const hashDiff = HAND_VALUES[b.hash] - HAND_VALUES[a.hash];
  if (hashDiff < 0) {
    return Number.NEGATIVE_INFINITY;
  } else if (hashDiff > 0) {
    return Number.POSITIVE_INFINITY;
  }
  return CARD_VALUES[b.joker] - CARD_VALUES[a.joker];
};

const getHash = (cardsMap) => Number(Object.entries(cardsMap)
  .sort((a, b) => {
    const countDiff = b[1] - a[1];
    if (countDiff < 0) {
      return Number.NEGATIVE_INFINITY;
    } else if (countDiff > 0) {
      return Number.POSITIVE_INFINITY;
    }
    return CARD_VALUES[b[0]] - CARD_VALUES[a[0]];
  }).reduce((prev, curr) => prev.concat(String(curr[1])), ''));

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

    if ('J' in cardsMap) {
      const possibleHands = [];
      for (const card of Object.keys(cardsMap)) {
        if (card === 'J') {
          continue;
        }
        const cardsMapCopy = JSON.parse(JSON.stringify(cardsMap));
        cardsMapCopy[card] += cardsMapCopy.J;
        delete cardsMapCopy.J;
        const hash = getHash(cardsMapCopy);
        possibleHands.push({ hash, joker: card });
      }
      const possibleHandsSorted = possibleHands.length > 0 ? possibleHands.sort(comparePossibleHands) : [{ hash: 5, joker: 'A' }];
      const bestPossibleHand = possibleHandsSorted.shift();
      // hand.cards = hand.cards.join('').replaceAll('J', bestPossibleHand.joker).split('');
      hand.hash = bestPossibleHand.hash;
    } else {
      hand.hash = getHash(cardsMap);
    }
  }

  return hands.sort(compareHands).reduce((prev, curr, index) => prev + ((index + 1) * curr.bid), 0);
};

answer = main(); // 248750248
