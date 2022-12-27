// Part 1

let caloriesCount = 0;
let caloriesMax = 0;
for (const c of input.split('\n')) {
  if (c === '') {
    caloriesMax = Math.max(caloriesCount, caloriesMax);
    caloriesCount = 0;
  } else {
    caloriesCount += parseInt(c, 10);
  }
}

answer = caloriesMax;
