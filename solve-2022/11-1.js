// Part 1

const ROUNDS = 20;
const DIVIDER = 3;

class Monkey {
  constructor(monkeyInput) {
    const regexGetInteger = /([\d]+)/;
    const lines = monkeyInput.split('\n').map((v) => v.split(':').map((v) => v.trim()));
    for (const line of lines) {
      if (line[0].startsWith('Monkey')) {
        this.id = Number.parseInt(regexGetInteger.exec(line[0])[1], 10);
      } else if (line[0] === 'Starting items') {
        this.itemsWorryLevel = line[1].split(',').map((v) => Number.parseInt(v.trim(), 10));
      } else if (line[0] === 'Operation') {
        this.operation = line[1].split('=')[1].trim().replaceAll('old', 'v');
      } else if (line[0] === 'Test') {
        this.divisibleBy = Number.parseInt(regexGetInteger.exec(line[1])[1], 10);
      } else if (line[0] === 'If true') {
        this.nextTrue = Number.parseInt(regexGetInteger.exec(line[1])[1], 10);
      } else if (line[0] === 'If false') {
        this.nextFalse = Number.parseInt(regexGetInteger.exec(line[1])[1], 10);
      }
    }
    this.inspectionsCount = 0;
  }

  addItemWorryLevel(itemWorryLevel) {
    this.itemsWorryLevel.push(itemWorryLevel);
  }

  doInspections() {
    // biome-ignore lint/security/noGlobalEval: <explanation>
    this.itemsWorryLevel = this.itemsWorryLevel.map((v) => Math.floor(eval(this.operation) / DIVIDER));
    this.inspectionsCount += this.itemsWorryLevel.length;
  }

  getItemWorryLevel() {
    return this.itemsWorryLevel.shift();
  }

  getNext(itemWorryLevel) {
    return itemWorryLevel % this.divisibleBy === 0 ? this.nextTrue : this.nextFalse;
  }

  getInspectionsCount() {
    return this.inspectionsCount;
  }

  print() {
    console.warn({
      monkeyId: this.id,
      inspectionsCount: this.inspectionsCount,
      itemsWorryLevel: this.itemsWorryLevel,
      operation: this.operation,
      divisibleBy: this.divisibleBy,
      nextTrue: this.nextTrue,
      nextFalse: this.nextFalse,
    });
  }
}

const monkeysList = [];
for (const monkeyInput of input.split('\n\n')) {
  monkeysList.push(new Monkey(monkeyInput));
}

for (let round = 0; round < ROUNDS; round++) {
  for (const monkey of monkeysList) {
    monkey.doInspections();
    let itemWorryLevel = monkey.getItemWorryLevel();
    while (itemWorryLevel) {
      const next = monkey.getNext(itemWorryLevel);
      monkeysList[next].addItemWorryLevel(itemWorryLevel);
      itemWorryLevel = monkey.getItemWorryLevel();
    }
  }
}

const monkeysInspectionsCount = [];
for (const monkey of monkeysList) {
  monkeysInspectionsCount.push(monkey.getInspectionsCount());
}

const result = monkeysInspectionsCount.sort((a, b) => b - a);

answer = result[0] * result[1];
