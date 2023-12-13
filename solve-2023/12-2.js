// Part 2

const parseInput = () => {
  const data = [];
  for (const line of input.split('\n')) {
    const [records, sizes] = line.split(' ');
    data.push({
      records,
      sizes: sizes.split(',').map(Number) // brokenHotSpingSizes
    });
  }
  return data;
};

let getNbArrangements = (records, sizes) => {
  if (records.length === 0) {
    return (sizes.length === 0) ? 1 : 0;
  }
  if (sizes.length === 0) {
    return (records.includes('#')) ? 0 : 1;
  }

  if (records[0] === '.') {
    return getNbArrangements(records.slice(1), sizes);
  }

  if (records[0] === '#') {
    const [current, ...rest] = sizes;
    if (records.length < current) {
      return 0;
    }
    if (records.slice(0, current).includes('.')) {
      return 0;
    }
    if (records[current] === '#') {
      return 0;
    }
    return getNbArrangements(records.slice(current + 1), rest);
  }

  return getNbArrangements(`#${records.slice(1)}`, sizes)
       + getNbArrangements(`.${records.slice(1)}`, sizes);
};

const memoize = (fn, cache = new Map()) => (...args) => {
  const key = JSON.stringify(args);
  if (cache.has(key)) {
    return cache.get(key);
  }
  const result = fn(...args);
  cache.set(key, result);
  return result;
};

getNbArrangements = memoize(getNbArrangements);

const main = () => {
  const data = parseInput();
  let sum = 0;
  for (let { records, sizes } of data) {
    records = Array.from({ length: 5 }, () => records).join('?');
    sizes = Array.from({ length: 5 }, () => sizes).flat();
    sum += getNbArrangements(records, sizes);
  }
  console.log({ sum });
  return sum;
};

answer = main(); // 7732028747925
