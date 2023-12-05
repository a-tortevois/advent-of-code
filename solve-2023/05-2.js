// Part 2

const RESSOURCES = [
  'soil',
  'fertilizer',
  'water',
  'light',
  'temperature',
  'humidity',
  'location'
];

const parseInput = () => {
  const data = {};
  let ressource = '';
  for (const line of input.split('\n')) {
    if (line.length === 0) {
      ressource = '';
      continue;
    }

    // extract seeds
    if (line.startsWith('seeds:')) {
      data.seeds = line.split(':')[1].trim().split(/\s+/).map(Number);
      continue;
    }

    // extract ressource
    if (/-to-(.*)\smap/.test(line)) {
      ressource = line.match(/-to-(.*)\smap/)[1];
      data[ressource] = [];
      continue;
    }

    // extract numbers
    if (/^(\d+)\s(\d+)\s(\d+)$/.test(line)) {
      const [destination, source, length] = line.split(/\s/).map(Number);
      data[ressource].push({ destination, source, length });
      continue;
    }

    throw new Error(`Unknown line: ${line}, len:${line.length}`);
  }
  // sort ressources
  for (const ressource of RESSOURCES) {
    data[ressource].sort((a, b) => a.source - b.source);
  }
  return data;
};

const isBetween = (n, min, max) => n >= min && n < max;

const main = () => {
  let lowestLocation = Number.POSITIVE_INFINITY;
  const data = parseInput();

  // build ranges of seed numbers
  const seedRanges = [];
  for (let i = 0; i < data.seeds.length; i += 2) {
    seedRanges.push([data.seeds[i], data.seeds[i] + data.seeds[i + 1] - 1]);
  }

  const finalSeedRanges = [];
  for (const seedRange of seedRanges) {
    let seeds = [seedRange];
    for (const ressource of RESSOURCES) {
      const movedSeeds = [];
      for (const { destination, source, length } of data[ressource]) {
        const unmovedSeeds = [];
        for (const [start, end] of seeds) {
          if (isBetween(start, source, source + length)) {
            if (end < source + length) {
              movedSeeds.push([start - source + destination, end - source + destination]);
            } else {
              movedSeeds.push([start - source + destination, length - 1 + destination]);
              unmovedSeeds.push([source + length, end]);
            }
          } else if (isBetween(end, source, source + length)) {
            movedSeeds.push([destination, end - source + destination]);
            unmovedSeeds.push([start, source - 1]);
          } else {
            unmovedSeeds.push([start, end]);
          }
        }
        seeds = unmovedSeeds;
      }
      seeds.push(...movedSeeds);
    }
    finalSeedRanges.push(...seeds);
  }
  lowestLocation = Math.min(...finalSeedRanges.flat());
  return lowestLocation;
};

answer = main(); // 59370572
