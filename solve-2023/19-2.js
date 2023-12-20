// Part 2

const workflows = {};

const parseInput = () => {
  const [rawWorkflows] = input.split('\n\n').map((line) => line.split('\n'));

  // Parse workflows
  for (const rawWorkflow of rawWorkflows) {
    const matches = [...rawWorkflow.matchAll(/(?<name>[a-z]+){(?<rules>.*)}/g)].map(({ groups }) => groups);
    for (const { name, rules } of matches) {
      workflows[name] = rules.split(',').map((rule) => {
        const groups = [...rule.matchAll(/(?<part>[a-zA-Z]+)(?<operator>[<>])(?<value>\d+):(?<output>[a-zA-Z]+)/g)].map((match) => match?.groups)[0];
        if (groups) {
          return {
            part: groups.part,
            output: groups.output,
            operator: groups.operator,
            value: Number(groups.value)
          };
        }
        return { output: rule };
      });
      workflows[name] = {
        rules: workflows[name].slice(0, -1),
        default: workflows[name].slice(-1)[0].output
      };
    }
  }
};

const getCombinations = (part) => ['x', 'm', 'a', 's'].reduce((prev, curr) => prev * (part[curr].max - part[curr].min + 1), 1);

const workflowIsEnded = (part) => ['A', 'R'].includes(part.workflow);

const execWorkflows = () => {
  let combinations = 0;
  const queue = [{
    workflow: 'in',
    x: { min: 1, max: 4000 },
    m: { min: 1, max: 4000 },
    a: { min: 1, max: 4000 },
    s: { min: 1, max: 4000 }
  }];
  while (queue.length > 0) {
    let currPart = queue.shift();
    const workflow = workflows[currPart.workflow];
    currPart = { ...currPart, workflow: workflow.default };
    for (const { part, output, operator, value } of workflow.rules) {
      const nextPart = Object.assign(JSON.parse(JSON.stringify(currPart)), { workflow: output }); // deep copy
      if (operator === '<') {
        nextPart[part].max = Math.min(nextPart[part].max, value - 1);
        currPart[part].min = Math.max(currPart[part].min, nextPart[part].max + 1);
      } else {
        nextPart[part].min = Math.max(nextPart[part].min, value + 1);
        currPart[part].max = Math.min(currPart[part].max, nextPart[part].min - 1);
      }
      if (workflowIsEnded(nextPart)) {
        if (nextPart.workflow === 'A') {
          combinations += getCombinations(nextPart);
        }
        continue;
      }
      queue.push(nextPart);
    }
    if (workflowIsEnded(currPart)) {
      if (currPart.workflow === 'A') {
        combinations += getCombinations(currPart);
      }
      continue;
    }
    queue.push(currPart);
  }
  return combinations;
};

const main = () => {
  parseInput();
  return execWorkflows();
};

answer = main();
