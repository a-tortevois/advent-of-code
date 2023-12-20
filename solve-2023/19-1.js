// Part 1

const workflows = {};
const parts = [];

const parseInput = () => {
  const [rawWorkflows, rawParts] = input.split('\n\n').map((line) => line.split('\n'));

  // Parse workflows
  for (const rawWorkflow of rawWorkflows) {
    const matches = [...rawWorkflow.matchAll(/(?<name>[a-z]+){(?<rules>.*)}/g)].map(({ groups }) => groups);
    for (const { name, rules } of matches) {
      workflows[name] = rules.split(',').map((rule) => {
        const groups = [...rule.matchAll(/(?<part>[a-zA-Z]+)(?<operator>[<>])(?<value>\d+):(?<output>[a-zA-Z]+)/g)].map((match) => match?.groups)[0];
        if (groups) {
          const obj = {
            part: groups.part,
            output: groups.output
          };
          if (groups.operator === '>') {
            obj.comparator = (value) => value > Number(groups.value);
          } else {
            obj.comparator = (value) => value < Number(groups.value);
          }
          return obj;
        }
        return { output: rule };
      });
    }
  }

  // Parse parts
  for (const rawPart of rawParts) {
    const matches = [...rawPart.matchAll(/((?<key>[a-z]+)=(?<value>\d+))/g)].map(({ groups }) => groups);
    const part = {};
    for (const { key, value } of matches) {
      part[key] = Number(value);
    }
    parts.push(part);
  }
};

const execWorkflow = (name, part) => {
  let next = null;
  for (const rule of workflows[name]) {
    if (rule.part) {
      if (rule.comparator(part[rule.part])) {
        next = rule.output;
        break;
      }
    } else {
      next = rule.output;
    }
  }
  return next;
};

const getWorkflowsOutput = (part) => {
  let next = 'in';
  while (!['A', 'R'].includes(next)) {
    next = execWorkflow(next, part);
  }
  return next;
};

const getAcceptedRatingNumbers = () => {
  let result = 0;
  for (const part of parts) {
    const output = getWorkflowsOutput(part);
    if (output === 'A') {
      for (const key of Object.keys(part)) {
        result += part[key];
      }
    }
  }
  return result;
};

const main = () => {
  parseInput();
  return getAcceptedRatingNumbers();
};

answer = main(); // 434147
