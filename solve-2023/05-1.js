// Part 1

const RESSOURCES = ['soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location'];

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
  for (const number of data.seeds) {
    let location = number;
    for (const ressource of RESSOURCES) {
      for (const { destination, source, length } of data[ressource]) {
        if (isBetween(location, source, source + length)) {
          const offset = location - source;
          location = destination + offset;
          break;
        }
      }
    }
    lowestLocation = Math.min(lowestLocation, location);
  }
  return lowestLocation;
};

answer = main(); // 806029445
