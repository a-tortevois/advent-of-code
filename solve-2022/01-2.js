// Part 2

const elfCaloriesCount = [];
let caloriesCount = 0;
for (const c of input.split('\n')) {
  if (c === '') {
    elfCaloriesCount.push(caloriesCount);
    caloriesCount = 0;
  } else {
    caloriesCount += Number.parseInt(c, 10);
  }
}
const caloriesMax = elfCaloriesCount.sort((a, b) => b - a).slice(0, 3).reduce((p, v) => v + p);

answer = caloriesMax;
