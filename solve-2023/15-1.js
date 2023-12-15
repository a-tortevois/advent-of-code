// Part 1

const parseInput = () => input.split(',');

const getHash = (str) => {
  let hash = 0;
  for (const char of str) {
    hash += char.charCodeAt(0);
    hash *= 17;
    hash %= 256;
  }
  return hash;
};

const main = () => parseInput().map(getHash).reduce((prev, curr) => prev + curr, 0);

answer = main(); // 512797
