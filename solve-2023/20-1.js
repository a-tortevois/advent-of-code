// Part 1

const MODULE = {
  BUTTON: 'button',
  BROADCASTER: 'broadcaster',
  CONJONCTION: 'conjonction',
  FLIP_FLOP: 'flip-flop',
  OUTPUT: 'output'
};

// Pulse states:
// LOW => false
// HIGHT => true

// Modules states:
// OFF => false
// ON => true

const modules = {};
const visitedState = new Map();

const parseInput = () => {
  for (const line of input.split('\n')) {
    const [module, listDestinations] = line.split('->').map((v) => v.trim());
    const destinations = listDestinations.split(',').map((v) => v.trim());
    if (module === MODULE.BROADCASTER) {
      modules[MODULE.BROADCASTER] = { destinations };
    } else {
      const name = module.slice(1);
      const type = module.startsWith('&') ? MODULE.CONJONCTION : MODULE.FLIP_FLOP;
      modules[name] = {
        type,
        destinations
      };
      if (type === MODULE.FLIP_FLOP) {
        modules[name].state = false;
      } else {
        modules[name].inputs = {};
      }
    }
  }
};

const initModules = () => {
  for (const name of Object.keys(modules)) {
    for (const destination of modules[name].destinations) {
      if (!(destination in modules)) {
        modules[destination] = { type: MODULE.OUTPUT };
      } else if (modules[destination].type === MODULE.CONJONCTION) {
        modules[destination].inputs[name] = false;
      }
    }
  }
};

const doFlipFlop = (state) => {
  if (!state.pulse) {
    modules[state.name].state = !modules[state.name].state;
    state.pulse = modules[state.name].state;
  }
};

const doConjonction = (state) => {
  modules[state.name].inputs[state.from] = state.pulse;
  state.pulse = !Object.values(modules[state.name].inputs).every((input) => input === true);
};

const pressButton = (cycle) => {
  const queue = [{
    from: MODULE.BUTTON,
    name: MODULE.BROADCASTER,
    pulse: false
  }];
  while (queue.length > 0) {
    const state = queue.shift();
    const stateHash = JSON.stringify(state);
    if (visitedState.has(stateHash)) {
      visitedState.get(stateHash).push(cycle);
    } else {
      visitedState.set(stateHash, [cycle]);
    }
    if (modules[state.name].type === MODULE.OUTPUT) {
      continue;
    } else if (modules[state.name].type === MODULE.CONJONCTION) {
      doConjonction(state);
    } else if (modules[state.name].type === MODULE.FLIP_FLOP) {
      if (state.pulse) {
        continue;
      }
      doFlipFlop(state);
    }
    for (const name of modules[state.name].destinations) {
      queue.push({
        from: state.name,
        name,
        pulse: state.pulse
      });
    }
  }
};

const execCycles = () => {
  for (let cycles = 0; cycles < 1000; cycles++) {
    pressButton(cycles);
  }
};

const computePulses = () => {
  const pulses = {
    low: 0,
    high: 0
  };
  for (const state of [...visitedState.keys()]) {
    const cycles = visitedState.get(state).length;
    if (state.includes('"pulse":true')) {
      pulses.high += cycles;
    } else {
      pulses.low += cycles;
    }
  }
  return (pulses.high * pulses.low);
};

const main = () => {
  parseInput();
  initModules();
  execCycles();
  return computePulses();
};

answer = main(); // 806332748
