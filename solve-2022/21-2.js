// Part 2

const data = input;

const PATTERN = {
  isNumber: /^\d+$/,
  parseOperation: /^(\w+) ([+\-*/]) (\w+)$/
};

const ROOT_OPERAND = 'root';
const SEARCHED_OPERAND = 'humn';

const parseData = (data) => {
  const numbers = new Map();
  const operations = new Map();
  const lines = data.split('\n');
  for (const line of lines) {
    const [id, expression] = line.split(':').map((v) => v.trim());
    if (new RegExp(PATTERN.isNumber, 'g').test(expression)) {
      if (id !== SEARCHED_OPERAND) {
        numbers.set(id, Number(expression));
      }
    } else {
      const [_, operand1, operator, operand2] = new RegExp(PATTERN.parseOperation, 'g').exec(expression);
      if (id === ROOT_OPERAND) {
        operations.set(id, { operand1, operator: '=', operand2 });
      } else {
        operations.set(id, { operand1, operator, operand2 });
      }
    }
  }
  return { numbers, operations };
};

const getReversedOperator = (operator) => {
  switch (operator) {
    case '+': {
      return '-';
    }
    case '-': {
      return '+';
    }
    case '*': {
      return '/';
    }
    case '/': {
      return '*';
    }
    default: {
      throw new Error('Unknown operator:', operator);
    }
  }
};

const getReversedOperation = (searchOperand) => {
  for (const [id, { operand1, operator, operand2 }] of operations.entries()) {
    // Division and subtraction are not commutative operations:
    // 5 = 3 - a => a = 5 + 3
    // 5 = a - 3 => a = 3 - 5
    // 5 = 3 / a => a = 5 * 3
    // 5 = a / 3 => a = 3 / 5
    if (operand1 === searchOperand) {
      return {
        id,
        operand1: id,
        operator: getReversedOperator(operator),
        operand2
      };
    } else if (operand2 === searchOperand) {
      if (operator === '+' || operator === '*') {
        return {
          id,
          operand1: id,
          operator: getReversedOperator(operator),
          operand2: operand1
        };
      }
      return {
        id,
        operand1,
        operator,
        operand2: id
      };
    }
  }
};

const getResult = (operand) => {
  if (!numbers.has(operand)) {
    let result;
    if (!operations.has(operand)) {
      const reversedOperation = getReversedOperation(operand);
      operations.delete(reversedOperation.id);
      if (reversedOperation.id !== ROOT_OPERAND) {
        result = doOperation(reversedOperation);
      } else {
        if (numbers.has(reversedOperation.operand1)) {
          return numbers.get(reversedOperation.operand1);
        }
        return numbers.get(reversedOperation.operand2);
      }
    } else {
      result = doOperation(operations.get(operand));
    }
    numbers.set(operand, result);
  }
  return numbers.get(operand);
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

const hasSearchedOperand = ({ operand1, operand2 }) => {
  if (operand1 === SEARCHED_OPERAND || operand2 === SEARCHED_OPERAND) {
    return true;
  }
  return (operations.has(operand1) && hasSearchedOperand(operations.get(operand1))) || (operations.has(operand2) && hasSearchedOperand(operations.get(operand2)));
};

const { numbers, operations } = parseData(data);

// Get root and process operations for operand that does not contain `humn`
const { operand1, operand2 } = operations.get(ROOT_OPERAND);
if (!hasSearchedOperand(operations.get(operand1))) {
  numbers.set(operand1, doOperation(operations.get(operand1)));
} else {
  numbers.set(operand2, doOperation(operations.get(operand2)));
}

// Get reversed operation from `humn` and process
const reversedOperation = getReversedOperation(SEARCHED_OPERAND);
operations.delete(reversedOperation.operand1);

answer = doOperation(reversedOperation);
