// Part 1

const data = input;

const COLLECTING_TIME = 24;

class Blueprint {
  constructor(id, robotOreCostOre, robotClayCostOre, robotObsidianCostOre, robotObsidianCostClay, robotGeodeCostOre, robotGeodeCostObsidian) {
    this.id = id;
    this.robotOreCostOre = robotOreCostOre;
    this.robotClayCostOre = robotClayCostOre;
    this.robotObsidianCostOre = robotObsidianCostOre;
    this.robotObsidianCostClay = robotObsidianCostClay;
    this.robotGeodeCostOre = robotGeodeCostOre;
    this.robotGeodeCostObsidian = robotGeodeCostObsidian;
  }

  get() {
    return {
      id: this.id,
      robotOreCostOre: this.robotOreCostOre,
      robotClayCostOre: this.robotClayCostOre,
      robotObsidianCostOre: this.robotObsidianCostOre,
      robotObsidianCostClay: this.robotObsidianCostClay,
      robotGeodeCostOre: this.robotGeodeCostOre,
      robotGeodeCostObsidian: this.robotGeodeCostObsidian
    };
  }

  toString() {
    let str = ``;
    str += `Blueprint #${this.id}:\n`;
    str += ` - Each ore robot costs ${this.robotOreCostOre} ore.\n`;
    str += ` - Each clay robot costs ${this.robotClayCostOre} ore.\n`;
    str += ` - Each obsidian robot costs ${this.robotObsidianCostOre} ore and ${this.robotObsidianCostClay} clay.\n`;
    str += ` - Each geode robot costs ${this.robotGeodeCostOre} ore and ${this.robotGeodeCostObsidian} obsidian.`;
    return str;
  }
}

class CollectingState {
  constructor(stockOre, stockClay, stockObsidian, stockGeode, robotsOre, robotsClay, robotsObsidian, robotsGeode, time) {
    this.stockOre = stockOre;
    this.stockClay = stockClay;
    this.stockObsidian = stockObsidian;
    this.stockGeode = stockGeode;
    this.robotsOre = robotsOre;
    this.robotsClay = robotsClay;
    this.robotsObsidian = robotsObsidian;
    this.robotsGeode = robotsGeode;
    this.time = time;
  }

  get() {
    return {
      stockOre: this.stockOre,
      stockClay: this.stockClay,
      stockObsidian: this.stockObsidian,
      stockGeode: this.stockGeode,
      robotsOre: this.robotsOre,
      robotsClay: this.robotsClay,
      robotsObsidian: this.robotsObsidian,
      robotsGeode: this.robotsGeode,
      time: this.time
    };
  }

  getHash() {
    return `t=${this.time},sOr=${this.stockOre},sCl=${this.stockClay},sOb=${this.stockObsidian},sGe=${this.stockGeode},rOr=${this.robotsOre},rCl=${this.robotsClay},rOb=${this.robotsObsidian},rGe=${this.robotsGeode}`;
  }

  toString() {
    let str = ``;
    str += `State t=${this.time}: `;
    str += `Stock(Or=${this.stockOre},Cl=${this.stockClay},Ob=${this.stockObsidian},Ge=${this.stockGeode}) `;
    str += `Robots(Or=${this.robotsOre},Cl=${this.robotsClay},Ob=${this.robotsObsidian},Ge=${this.robotsGeode})`;
    return str;
  }
}

const parseData = (data) => {
  const blueprintsMap = new Map();
  const regex = new RegExp(/(\d+)+/, 'g');
  for (const line of data.split('\n')) {
    const [
      id,
      robotOreCostOre,
      robotClayCostOre,
      robotObsidianCostOre,
      robotObsidianCostClay,
      robotGeodeCostOre,
      robotGeodeCostObsidian
    ] = [...line.matchAll(regex)].map((v) => v[1]);
    blueprintsMap.set(id, new Blueprint(id, robotOreCostOre, robotClayCostOre, robotObsidianCostOre, robotObsidianCostClay, robotGeodeCostOre, robotGeodeCostObsidian));
  }
  return blueprintsMap;
};

const solve = (blueprint, time) => {
  const {
    id, robotOreCostOre, robotClayCostOre, robotObsidianCostOre, robotObsidianCostClay, robotGeodeCostOre, robotGeodeCostObsidian
  } = blueprint.get();
  const maxOre = Math.max(robotOreCostOre, robotClayCostOre, robotObsidianCostOre, robotGeodeCostOre);
  let maxGeodesCracked = 0;
  const collectingStateSeen = new Set();
  const initialCollectingState = new CollectingState(0, 0, 0, 0, 1, 0, 0, 0, time);
  const queue = [initialCollectingState];
  console.warn(`Start to solve Blueprint #${id}`);
  while (queue.length > 0) {
    const state = queue.shift();
    let {
      stockOre, stockClay, stockObsidian, stockGeode, robotsOre, robotsClay, robotsObsidian, robotsGeode, time
    } = state.get();
    maxGeodesCracked = Math.max(maxGeodesCracked, stockGeode);
    // no time left
    if (time === 0) {
      continue;
    }
    // abort the worst strategies...
    const possibleGeodes = (time * (time + 1)) / 2;
    if (possibleGeodes + stockGeode < maxGeodesCracked) {
      continue;
    }
    // it's not necessary to have more robots than the cost
    if (robotsOre >= maxOre) {
      robotsOre = maxOre;
    }
    if (robotsClay >= robotObsidianCostClay) {
      robotsClay = robotObsidianCostClay;
    }
    if (robotsObsidian >= robotGeodeCostObsidian) {
      robotsObsidian = robotGeodeCostObsidian;
    }
    // standardize resources inventory
    if (stockOre >= (time * maxOre) - (robotsOre * (time - 1))) {
      stockOre = (time * maxOre) - (robotsOre * (time - 1));
    }
    if (stockClay >= (time * robotObsidianCostClay) - (robotsClay * (time - 1))) {
      stockClay = (time * robotObsidianCostClay) - (robotsClay * (time - 1));
    }
    if (stockObsidian >= (time * robotGeodeCostObsidian) - (robotsObsidian * (time - 1))) {
      stockObsidian = (time * robotGeodeCostObsidian) - (robotsObsidian * (time - 1));
    }

    // update the collecting state
    const nextState = new CollectingState(stockOre, stockClay, stockObsidian, stockGeode, robotsOre, robotsClay, robotsObsidian, robotsGeode, time);
    const nextStateHash = nextState.getHash();
    if (collectingStateSeen.has(nextStateHash)) {
      continue;
    }
    collectingStateSeen.add(nextStateHash);

    if (collectingStateSeen.size % 100_000 === 0) {
      console.warn({ blueprint: id, time, best: maxGeodesCracked, len: collectingStateSeen.size });
    }

    // gather the resources for next round
    const nextStockOre = stockOre + robotsOre;
    const nextStockClay = stockClay + robotsClay;
    const nextStockObsidian = stockObsidian + robotsObsidian;
    const nextStockGeode = stockGeode + robotsGeode;
    const nextTime = time - 1;

    // finally, explore all the strategies
    // first, do nothing... keep collecting
    queue.push(new CollectingState(nextStockOre, nextStockClay, nextStockObsidian, nextStockGeode, robotsOre, robotsClay, robotsObsidian, robotsGeode, nextTime));
    // then, if you can...
    // buy one robot for ore
    if (stockOre >= robotOreCostOre) {
      queue.push(new CollectingState(nextStockOre - robotOreCostOre, nextStockClay, nextStockObsidian, nextStockGeode, robotsOre + 1, robotsClay, robotsObsidian, robotsGeode, nextTime));
    }
    // buy one robot for clay
    if (stockOre >= robotClayCostOre) {
      queue.push(new CollectingState(nextStockOre - robotClayCostOre, nextStockClay, nextStockObsidian, nextStockGeode, robotsOre, robotsClay + 1, robotsObsidian, robotsGeode, nextTime));
    }
    // buy one robot for obsidian
    if (stockOre >= robotObsidianCostOre && stockClay >= robotObsidianCostClay) {
      queue.push(new CollectingState(nextStockOre - robotObsidianCostOre, nextStockClay - robotObsidianCostClay, nextStockObsidian, nextStockGeode, robotsOre, robotsClay, robotsObsidian + 1, robotsGeode, nextTime));
    }
    // buy one robot for geode
    if (stockOre >= robotGeodeCostOre && stockObsidian >= robotGeodeCostObsidian) {
      queue.push(new CollectingState(nextStockOre - robotGeodeCostOre, nextStockClay, nextStockObsidian - robotGeodeCostObsidian, nextStockGeode, robotsOre, robotsClay, robotsObsidian, robotsGeode + 1, nextTime));
    }
  }
  console.warn({ blueprint: id, time, best: maxGeodesCracked, len: collectingStateSeen.size });
  return maxGeodesCracked;
};

const blueprintsMap = parseData(data);
let result = 0;
for (const [id, blueprint] of blueprintsMap.entries()) {
  result += id * solve(blueprint, COLLECTING_TIME);
}

answer = result;
