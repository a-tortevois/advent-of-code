// Part 1

answer = input.split('\n').map((str) => {
  const matches = [...str.matchAll(/(\d)/g)];
  return Number(`${matches[0][0]}${matches[matches.length - 1][0]}`);
}).reduce((prev, curr) => (prev += curr), 0);
