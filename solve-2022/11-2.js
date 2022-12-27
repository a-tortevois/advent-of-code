// Part 2

const ROUNDS = 10_000;
let DIVIDER = 1;

class Monkey {
  constructor(monkeyInput) {
    const regexGetInteger = /([\d]+)/;
    const lines = monkeyInput.split('\n').map((v) => v.split(':').map((v) => v.trim()));
    for (const line of lines) {
      if (line[0].startsWith('Monkey')) {
        this._id = parseInt(regexGetInteger.exec(line[0])[1], 10);
      } else if (line[0] === 'Starting items') {
        this._itemsWorryLevel = line[1].split(',').map((v) => parseInt(v.trim(), 10));
      } else if (line[0] === 'Operation') {
        this._operation = line[1].split('=')[1].trim().replaceAll('old', 'v');
      } else if (line[0] === 'Test') {
        this._divisibleBy = parseInt(regexGetInteger.exec(line[1])[1], 10);
      } else if (line[0] === 'If true') {
        this._nextTrue = parseInt(regexGetInteger.exec(line[1])[1], 10);
      } else if (line[0] === 'If false') {
        this._nextFalse = parseInt(regexGetInteger.exec(line[1])[1], 10);
      }
    }
    this._inspectionsCount = 0;
  }

  get id() {
    return this._id;
  }

  get divisibleBy() {
    return this._divisibleBy;
  }

  get inspectionsCount() {
    return this._inspectionsCount;
  }

  addItemWorryLevel(itemWorryLevel) {
    this._itemsWorryLevel.push(itemWorryLevel);
  }

  doInspections() {
    this._itemsWorryLevel = this._itemsWorryLevel.map((v) => (eval(this._operation) % DIVIDER));
    this._inspectionsCount += this._itemsWorryLevel.length;
  }

  getItemWorryLevel() {
    return this._itemsWorryLevel.shift();
  }

  getNext(itemWorryLevel) {
    return (itemWorryLevel % this.divisibleBy === 0) ? this._nextTrue : this._nextFalse;
  }

  print() {
    console.warn({
      monkeyId: this._id,
      inspectionsCount: this._inspectionsCount,
      itemsWorryLevel: this._itemsWorryLevel,
      operation: this._operation,
      divisibleBy: this._divisibleBy,
      nextTrue: this._nextTrue,
      nextFalse: this._nextFalse
    });
  }
}

const main = () => {
  const monkeysList = new Map();
  const monkeysInspectionsCount = [];

  // Parse the input and create the monkeys
  for (const monkeyInput of input.split('\n\n')) {
    const monkey = new Monkey(monkeyInput);
    monkeysList.set(monkey.id, monkey);
    DIVIDER *= monkey.divisibleBy;
  }

  // Play the rounds
  for (let round = 0; round < ROUNDS; round++) {
    for (const [_, monkey] of monkeysList) {
      monkey.doInspections();
      let itemWorryLevel = monkey.getItemWorryLevel();
      while (itemWorryLevel) {
        const next = monkey.getNext(itemWorryLevel);
        monkeysList.get(next).addItemWorryLevel(itemWorryLevel);
        itemWorryLevel = monkey.getItemWorryLevel();
      }
    }
  }

  // Get the inspections counts and return the result
  for (const [_, monkey] of monkeysList) {
    monkeysInspectionsCount.push(monkey.inspectionsCount);
  }
  monkeysInspectionsCount.sort((a, b) => b - a);
  return monkeysInspectionsCount[0] * monkeysInspectionsCount[1];
};

answer = main();
