// Part 1

const data = input;

const TIME_BEFORE_VOLCANO_ERUPTS = 30;
const STARTING_VALVE = 'AA';
const DEBUG = false;

const getDistancesTo = (valves, fromValve) => {
  const distanceTo = {};
  for (const edge of Object.keys(valves)) {
    distanceTo[edge] = Number.POSITIVE_INFINITY;
  }
  distanceTo[fromValve] = 0;
  const computeDistances = (edges, distance) => {
    // biome-ignore lint/style/noParameterAssign:
    distance++;
    for (const edge of edges) {
      if (distance < distanceTo[edge]) {
        distanceTo[edge] = distance;
        computeDistances(valves[edge].children, distance);
      }
    }
  };
  computeDistances(valves[fromValve].children, 0);
  // Remove unused valves
  for (const edge of Object.keys(distanceTo)) {
    if (valves[edge].flowRate === 0) {
      delete distanceTo[edge];
    }
  }
  return distanceTo;
};

const parseData = (data) => {
  const valves = {};
  const valvesToOpen = [];
  const regex = /Valve ([A-Z]{2}) has flow rate=(\d+); tunnel[s]? lead[s]? to valve[s]? (.*)/g;
  for (const [index, line] of data.split('\n').entries()) {
    const matches = Array.from(...line.matchAll(regex));
    valves[matches[1]] = {
      flowRate: Number.parseInt(matches[2], 10),
      children: matches[3].split(',').map((v) => v.trim()),
    };
  }
  for (const valve of Object.keys(valves)) {
    if (valves[valve].flowRate > 0) {
      valvesToOpen.push(valve);
    }
  }
  // Compute & get distances only for valves to be open
  for (const valve of Object.keys(valves)) {
    if (valve === STARTING_VALVE || valvesToOpen.includes(valve)) {
      valves[valve].distanceTo = getDistancesTo(valves, valve);
    }
  }
  // Remove unused valves
  for (const valve of Object.keys(valves)) {
    if (valve !== STARTING_VALVE && !valvesToOpen.includes(valve)) {
      delete valves[valve];
    }
  }
  return { valves, valvesToOpen };
};

const printValves = (valves) => {
  for (const valve of Object.keys(valves).sort()) {
    const distances = [];
    for (const distance of Object.keys(valves[valve].distanceTo).sort()) {
      distances.push(`\t${distance} : ${valves[valve].distanceTo[distance]}`);
    }
    console.warn(`${valve} => {\n${distances.join('\n')}\n}`);
  }
};

const exploreAllPaths = (valves, fromValve, valvesToOpen, path = [], elapsedTime = 0, releasedPressure = 0, maximalPressureReleased = 0, maximalPath = '') => {
  path.push(fromValve);
  for (const valve of valvesToOpen) {
    let localElapsedTime = elapsedTime;
    let localRelatedPressure = releasedPressure;
    let localValvesToOpen = [];
    const nextElapsedTime = localElapsedTime + valves[fromValve].distanceTo[valve] + 1;
    if (nextElapsedTime <= TIME_BEFORE_VOLCANO_ERUPTS) {
      localElapsedTime = nextElapsedTime;
      localRelatedPressure += (TIME_BEFORE_VOLCANO_ERUPTS - localElapsedTime) * valves[valve].flowRate;
      localValvesToOpen = valvesToOpen.filter((valveToOpen) => valveToOpen !== valve);
    }
    // biome-ignore lint/style/noParameterAssign:
    [maximalPressureReleased, maximalPath] = exploreAllPaths(valves, valve, localValvesToOpen, Array.from(path), localElapsedTime, localRelatedPressure, maximalPressureReleased, maximalPath);
  }
  if (releasedPressure > maximalPressureReleased) {
    // biome-ignore lint/style/noParameterAssign:
    maximalPath = path.join(',');
    // biome-ignore lint/style/noParameterAssign:
    maximalPressureReleased = releasedPressure;
  }
  return [maximalPressureReleased, maximalPath];
};

const { valves, valvesToOpen } = parseData(data);
if (DEBUG) {
  printValves(valves);
  console.warn({ valvesToOpen });
}

const [maximalPressureReleased, maximalPath] = exploreAllPaths(valves, STARTING_VALVE, valvesToOpen);
if (DEBUG) {
  console.warn({ maximalPath });
}

answer = maximalPressureReleased;
