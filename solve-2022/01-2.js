// Part 2

let elfCaloriesCount = [];
let caloriesCount = 0;
for (let c of input.split('\n')) {
    if (c === '') {
        elfCaloriesCount.push(caloriesCount);
        caloriesCount = 0;
    } else {
        caloriesCount += parseInt(c);
    }
}
let caloriesMax = elfCaloriesCount.sort((a, b) => b - a).slice(0, 3).reduce((p, v) => v + p);
answer = caloriesMax;