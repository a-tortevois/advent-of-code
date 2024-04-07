// Part 2

const spelledDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

answer = input
  .split('\n')
  .map((str) => {
    const digits = [];
    for (let i = 0; i < str.length; i++) {
      const sliced = str.slice(i);
      if (/\d/.test(sliced[0])) {
        digits.push(Number([sliced[0]]));
      }
      for (const [n, s] of spelledDigits.entries()) {
        if (sliced.startsWith(s)) {
          digits.push(n + 1);
          break;
        }
      }
    }
    return Number(`${digits[0]}${digits[digits.length - 1]}`);
  })
  .reduce((prev, curr) => {
    return prev + curr;
  }, 0);

// 54719
