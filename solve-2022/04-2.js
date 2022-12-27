// Part 2

let sum = 0;
for (const line of input.split('\n')) {
  const [elf1, elf2] = line.split(',').map((v) => v.split('-').map((v) => parseInt(v, 10)));
  if (elf1[0] <= elf2[1] && elf1[1] >= elf2[0]) {
    sum++;
  }
}

answer = sum;
