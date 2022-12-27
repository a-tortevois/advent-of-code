// Part 1

let sum = 0;
for (let line of input.split('\n')) {
    const [elf1, elf2] = line.split(',').map(v => v.split('-').map(v => parseInt(v)));
    if ((elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) || (elf1[0] >= elf2[0] && elf1[1] <= elf2[1])) {
        sum++;
    }
}
console.log("sum =", sum);
answer = sum;
