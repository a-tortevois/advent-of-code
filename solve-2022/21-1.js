// Part 1

const data = input;

const PATTERN = {
  isNumber: /^\d+$/,
  parseOperation: /^(\w+) ([+\-*/]) (\w+)$/,
};

const parseData = (data) => {
  const numbers = new Map();
  const operations = new Map();
  const lines = data.split('\n');
  for (const line of lines) {
    const [id, expression] = line.split(':').map((v) => v.trim());
    if (new RegExp(PATTERN.isNumber, 'g').test(expression)) {
      numbers.set(id, Number(expression));
    } else {
      const [_, operand1, operator, operand2] = new RegExp(PATTERN.parseOperation, 'g').exec(expression);
      operations.set(id, { operand1, operator, operand2 });
    }
  }
  return { numbers, operations };
};

const getResult = (id) => {
  if (!numbers.has(id)) {
    const result = doOperation(operations.get(id));
    numbers.set(id, result);
  }
  return numbers.get(id);
};

const doOperation = ({ operand1, operator, operand2 }) => {
  switch (operator) {
    case '+': {
      return getResult(operand1) + getResult(operand2);
    }
    case '-': {
      return getResult(operand1) - getResult(operand2);
    }
    case '*': {
      return getResult(operand1) * getResult(operand2);
    }
    case '/': {
      return getResult(operand1) / getResult(operand2);
    }
    default: {
      throw new Error('Unknown operator:', operator);
    }
  }
};

const { numbers, operations } = parseData(data);

answer = doOperation(operations.get('root'));
