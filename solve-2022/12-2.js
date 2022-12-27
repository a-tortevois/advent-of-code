// Part 2

const getElevation = (c) => {
    if (c === 'S') return 0;
    if (c === 'E') return 26;
    return c.codePointAt(0) - 0x61;
}

const parseInput = (lines) => {
    const H = lines.length;
    const W = lines[0].length;
    const grid = new Array(H);
    const startingPoint = {
        x: 0,
        y: 0
    }
    const exitPoint = {
        x: 0,
        y: 0
    }
    for (let i in lines) {
        let line = lines[i].split('');
        if (line.includes('S')) {
            startingPoint.x = line.indexOf('S');
            startingPoint.y = parseInt(i);
        }
        if (line.includes('E')) {
            exitPoint.x = line.indexOf('E');
            exitPoint.y = parseInt(i);
        }
        grid[i] = line.map(v => getElevation(v));
    }
    return [H, W, startingPoint, exitPoint, grid];
}

const isValidCoord = (c) => {
    return (c.x >= 0 && c.x < W && c.y >= 0 && c.y < H);
}

const isReachableCoord = (from, to) => {
    return (grid[from.y][from.x] - grid[to.y][to.x] <= 1);
}

const coordToString = (c) => {
    return `(${c.x};${c.y})`;
}

const getNeighbours = (from) => {
    return [{x: from.x + 1, y: from.y}, {x: from.x - 1, y: from.y}, {x: from.x, y: from.y - 1}, {x: from.x, y: from.y + 1}]
        .filter(c => isValidCoord(c))
        .filter(c => isReachableCoord(from, c));
}

const BFS = (from) => {
    const toVisit = [from];
    const exploredCoords = new Map();
    exploredCoords.set(coordToString(from), from); // Add the first element to avoid visiting it
    while (toVisit.length > 0) {
        const visited = toVisit.shift();
        const coordsToExplore = getNeighbours(visited).filter(c => !exploredCoords.has(coordToString(c)));
        for (let coord of coordsToExplore) {
            toVisit.push(coord);
            exploredCoords.set(coordToString(coord), visited);
        }
    }
    exploredCoords.delete(coordToString(from)); // Remove the first element
    return exploredCoords;
}

const getPathFrom = (from, coordsMap) => {
    const path = [from];
    let target = coordsMap.get(coordToString(from));
    while (target) {
        path.push(target);
        target = coordsMap.get(coordToString(target));
    }
    return path;
}

const [H, W, _, exitPoint, grid] = parseInput(input.split('\n'));

const getStartingPoints = () => {
    const startingPoint = [];
    for (let j = 0; j < H; j++) {
        for (let i = 0; i < H; i++) {
            if (grid[j][i] === 0) {
                startingPoint.push({x: i, y: j});
            }
        }
    }
    return startingPoint;
}

let bestPathSize = Number.POSITIVE_INFINITY;
const coordsMap = BFS(exitPoint);
for (let startingPoint of getStartingPoints()) {
    const pathSize = getPathFrom(startingPoint, coordsMap).length - 1;
    if (pathSize !== 0 && pathSize < bestPathSize) bestPathSize = pathSize;
}
answer = bestPathSize;