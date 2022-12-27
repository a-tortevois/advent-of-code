// Part 1

const data = input;

const TIME_BEFORE_VOLCANO_ERUPTS = 30;
const STARTING_VALVE = 'AA';
const DEBUG = false;

const parseData = (data) => {
    const valves = {};
    const valvesToOpen = [];
    const regex = /Valve ([A-Z]{2}) has flow rate=(\d+); tunnel[s]? lead[s]? to valve[s]? (.*)/g;
    for (const [index, line] of data.split('\n').entries()) {
        const matches = Array.from(...line.matchAll(regex));
        valves[matches[1]] = {
            flowRate: parseInt(matches[2]),
            children: matches[3].split(',').map(v => v.trim()),
        }
    }
    for (let valve of Object.keys(valves)) {
        if (valves[valve].flowRate > 0) {
            valvesToOpen.push(valve);
        }
    }
    // Compute & get distances only for valves to be open
    for (let valve of Object.keys(valves)) {
        if (valve === STARTING_VALVE || valvesToOpen.includes(valve)) {
            valves[valve].distanceTo = getDistancesTo(valves, valve);
        }
    }
    // Remove unused valves
    for (let valve of Object.keys(valves)) {
        if (valve !== STARTING_VALVE && !valvesToOpen.includes(valve)) {
            delete (valves[valve]);
        }
    }
    return {valves, valvesToOpen};
}

const getDistancesTo = (valves, fromValve) => {
    const distanceTo = {};
    for (let edge of Object.keys(valves)) {
        distanceTo[edge] = Number.POSITIVE_INFINITY;
    }
    distanceTo[fromValve] = 0;
    const computeDistances = (edges, distance) => {
        distance++;
        for (let edge of edges) {
            if (distance < distanceTo[edge]) {
                distanceTo[edge] = distance;
                computeDistances(valves[edge].children, distance);
            }
        }
    }
    computeDistances(valves[fromValve].children, 0);
    // Remove unused valves
    for (let edge of Object.keys(distanceTo)) {
        if (valves[edge].flowRate === 0) {
            delete (distanceTo[edge]);
        }
    }
    return distanceTo;
}

const printValves = (valves) => {
    for (let valve of Object.keys(valves).sort()) {
        let distances = [];
        for (let distance of Object.keys(valves[valve].distanceTo).sort()) {
            distances.push(`\t${distance} : ${valves[valve].distanceTo[distance]}`);
        }
        console.warn(`${valve} => {\n${distances.join('\n')}\n}`);
    }
}

const exploreAllPaths = (valves, fromValve, valvesToOpen, path = [], elapsedTime = 0, releasedPressure = 0, maximalPressureReleased = 0, maximalPath = '') => {
    path.push(fromValve);
    for (let valve of valvesToOpen) {
        let localElapsedTime = elapsedTime;
        let localRelatedPressure = releasedPressure;
        let localValvesToOpen = [];
        const nextElapsedTime = localElapsedTime + valves[fromValve].distanceTo[valve] + 1;
        if (nextElapsedTime <= TIME_BEFORE_VOLCANO_ERUPTS) {
            localElapsedTime = nextElapsedTime;
            localRelatedPressure += (TIME_BEFORE_VOLCANO_ERUPTS - localElapsedTime) * valves[valve].flowRate;
            localValvesToOpen = valvesToOpen.filter(valveToOpen => valveToOpen !== valve);
        }
        [maximalPressureReleased, maximalPath] = exploreAllPaths(valves, valve, localValvesToOpen, Array.from(path), localElapsedTime, localRelatedPressure, maximalPressureReleased, maximalPath);
    }
    if (releasedPressure > maximalPressureReleased) {
        maximalPath = path.join(',');
        maximalPressureReleased = releasedPressure;
    }
    return [maximalPressureReleased, maximalPath];
}

const {valves, valvesToOpen} = parseData(data);
if (DEBUG) {
    printValves(valves);
    console.warn({valvesToOpen})
}

const [maximalPressureReleased, maximalPath] = exploreAllPaths(valves, STARTING_VALVE, valvesToOpen);
if (DEBUG) console.warn({maximalPath});

answer = maximalPressureReleased;