// Part 2

const instructions = input.split('\n').map((v) => v.split(' '));

const W = 40;
let cyclesCount = 0;
let spritePos = 1;

const consumeCycle = () => {
  if (cyclesCount % W === 0) {
    process.stdout.write('\n');
    cyclesCount = 0;
  }
  const pixel = cyclesCount >= spritePos - 1 && cyclesCount <= spritePos + 1 ? '█' : ' ';
  process.stdout.write(pixel);
  cyclesCount++;
};

for (const instruction of instructions) {
  if (instruction[0] === 'noop') {
    consumeCycle();
  } else if (instruction[0] === 'addx') {
    consumeCycle();
    consumeCycle();
    spritePos += Number.parseInt(instruction[1], 10);
  }
}

answer = spritePos;
