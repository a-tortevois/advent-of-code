// Part 1

const data = input;
const TARGET_ROW = 2000000;

const coordToString = (c) => `${c.x};${c.y}`;

const getManhattanDistance = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

const parseData = (data) => {
  const sensors = new Map();
  const busyPositionOnTargetRow = new Set();
  const regex = /(-?\d+)/g;
  let Xmin = Number.POSITIVE_INFINITY;
  let Xmax = Number.NEGATIVE_INFINITY;
  let Ymin = Number.POSITIVE_INFINITY;
  let Ymax = Number.NEGATIVE_INFINITY;
  let distanceMax = Number.NEGATIVE_INFINITY;
  for (const [index, line] of data.split('\n').entries()) {
    const matches = [...line.matchAll(regex)];
    const sensor = { x: parseInt(matches[0][1], 10), y: parseInt(matches[1][1], 10) };
    const beacon = { x: parseInt(matches[2][1], 10), y: parseInt(matches[3][1], 10) };
    sensor.distance = getManhattanDistance(sensor, beacon);
    sensor.range = {
      // Xmin: sensor.x - sensor.distance,
      // Xmax: sensor.x + sensor.distance,
      Ymin: sensor.y - sensor.distance,
      Ymax: sensor.y + sensor.distance
    };
    // sensor.distanceFromOrigin = getManhattanDistance(sensor, {x: 0, y: 0});
    sensors.set(index, { ...sensor });
    if (sensor.y === TARGET_ROW) {
      busyPositionOnTargetRow.add(parseInt(matches[0][1], 10));
    }
    if (beacon.y === TARGET_ROW) {
      busyPositionOnTargetRow.add(parseInt(matches[2][1], 10));
    }
    Xmin = Math.min(Xmin, sensor.x, beacon.x);
    Xmax = Math.max(Xmax, sensor.x, beacon.x);
    Ymin = Math.min(Ymin, sensor.y, beacon.y);
    Ymax = Math.max(Ymax, sensor.y, beacon.y);
    distanceMax = Math.max(distanceMax, sensor.distance);
  }

  Xmin -= distanceMax;
  Xmax += distanceMax;
  Ymin -= distanceMax;
  Ymax += distanceMax;
  const W = Xmax - Xmin + 1;
  const H = Ymax - Ymin + 1;
  return {
    sensors, busyPositionOnTargetRow, Xmin, Xmax, Ymin, Ymax, W, H, distanceMax
  };
};

const getUsefulSensors = (sensors) => {
  const usefulSensors = [];
  for (const sensor of sensors.values()) {
    if (sensor.range.Ymin <= TARGET_ROW && sensor.range.Ymax >= TARGET_ROW) {
      usefulSensors.push({ ...sensor });
    }
  }
  return usefulSensors;
};

const getCoveredPositions = (usefulSensors, Xmin, Xmax) => {
  const hedgedPositions = new Set();
  for (let i = Xmin; i < Xmax; i++) {
    if (busyPositionOnTargetRow.has(i)) {
      continue;
    }
    for (const sensor of usefulSensors) {
      const position = { x: i, y: TARGET_ROW };
      const distance = getManhattanDistance(position, { x: sensor.x, y: sensor.y });
      if (distance <= sensor.distance) {
        hedgedPositions.add(coordToString(position));
      }
    }
  }
  return hedgedPositions;
};

const {
  sensors, busyPositionOnTargetRow, Xmin, Xmax, Ymin, Ymax, W, H, distanceMax
} = parseData(data);
const usefulSensors = getUsefulSensors(sensors);
const hedgedPositions = getCoveredPositions(usefulSensors, Xmin, Xmax);

answer = hedgedPositions.size;
