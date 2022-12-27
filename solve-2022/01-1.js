// Part 1

let caloriesCount = 0;
let caloriesMax = 0;
for (let c of input.split('\n')) {
    if (c === '') {
        caloriesMax = Math.max(caloriesCount, caloriesMax);
        caloriesCount = 0;
    } else {
        caloriesCount += parseInt(c);
    }
}
answer = caloriesMax;