// Part 1

const getPriority = (item) => {
  const index = item.charCodeAt(0);
  if (index < 0x5b) {
    // Uppercase
    return index - 38;
  } // Lowercase
  return index - 96;
};

const compareRucksacks = (c1, c2) => {
  for (const a of c1) {
    const aPriority = getPriority(a);
    // maybe more efficient than: a.includes(c2) ? return getPriority(a) : continue;
    for (const b of c2) {
      const bPriority = getPriority(b);
      if (aPriority > bPriority) {
        break;
      }
      if (aPriority === bPriority) {
        return bPriority;
      }
    }
  }
};

let sum = 0;
for (const rucksack of input.split('\n')) {
  const m = rucksack.length / 2;
  const c1 = rucksack
    .slice(0, m)
    .split('')
    .sort((a, b) => getPriority(b) - getPriority(a));
  const c2 = rucksack
    .slice(m)
    .split('')
    .sort((a, b) => getPriority(b) - getPriority(a));
  sum += compareRucksacks(c1, c2);
}

answer = sum;
