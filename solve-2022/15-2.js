// Part 2

const data = input;
const COORD_MAX = 4000000;

const getManhattanDistance = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

const parseData = (data) => {
  const sensors = new Map();
  const regex = /(-?\d+)/g;
  let Xmin = Number.POSITIVE_INFINITY;
  let Xmax = Number.NEGATIVE_INFINITY;
  let Ymin = Number.POSITIVE_INFINITY;
  let Ymax = Number.NEGATIVE_INFINITY;
  let distanceMax = Number.NEGATIVE_INFINITY;
  for (const [index, line] of data.split('\n').entries()) {
    const matches = [...line.matchAll(regex)];
    const sensor = { x: Number.parseInt(matches[0][1], 10), y: Number.parseInt(matches[1][1], 10) };
    const beacon = { x: Number.parseInt(matches[2][1], 10), y: Number.parseInt(matches[3][1], 10) };
    sensor.distance = getManhattanDistance(sensor, beacon);
    // sensor.range = {
    //     Xmin: sensor.x - sensor.distance,
    //     Xmax: sensor.x + sensor.distance,
    //     Ymin: sensor.y - sensor.distance,
    //     Ymax: sensor.y + sensor.distance,
    // }
    sensor.distanceFromOrigin = getManhattanDistance(sensor, { x: 0, y: 0 });
    sensors.set(index, { ...sensor });
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
    sensors,
    Xmin,
    Xmax,
    Ymin,
    Ymax,
    W,
    H,
    distanceMax,
  };
};

const getSensorsSortedByDistranceFromOrigin = (sensors) => Array.from(sensors.values()).sort((a, b) => a.distanceFromOrigin - b.distanceFromOrigin);

const canBeABeacon = (targetCoords, sensors) => {
  let sensorFound = null;
  for (const sensor of sensors) {
    const distance = getManhattanDistance(sensor, targetCoords);
    if (distance < sensor.distance) {
      sensorFound = sensor;
      break;
    }
  }
  return sensorFound;
};

const searchNearbyBeacon = (sensors) => {
  const Xmin = 0;
  const Ymin = 0;
  for (let y = Ymin; y < COORD_MAX; y++) {
    for (let x = Xmin; x < COORD_MAX; x++) {
      const sensor = canBeABeacon({ x, y }, sensors);
      if (!sensor) {
        return { x, y };
      }
      if (x < sensor.x) {
        x = sensor.x + getManhattanDistance(sensor, { x, y }); // by symmetry
      } else {
        x += sensor.distance - getManhattanDistance(sensor, { x, y }); // leave the area covered by the captor
      }
    }
  }
};

const { sensors, Xmin, Xmax, Ymin, Ymax, W, H, distanceMax } = parseData(data);
const sensorsSortedByDistanceFromOrigin = getSensorsSortedByDistranceFromOrigin(sensors);
const { x, y } = searchNearbyBeacon(sensorsSortedByDistanceFromOrigin);

const answer = x * 4_000_000 + y;
