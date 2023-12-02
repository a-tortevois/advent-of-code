// Part 2

const parseInput = () => input.split('\n').map((game, index) => {
  const sets = game.split(':')[1];
  const id = index + 1;
  const red = [...sets.matchAll(/(\d+) red/g)].map((matches) => Number(matches[1]));
  const green = [...sets.matchAll(/(\d+) green/g)].map((matches) => Number(matches[1]));
  const blue = [...sets.matchAll(/(\d+) blue/g)].map((matches) => Number(matches[1]));
  return {
    id,
    red,
    green,
    blue
  };
});

const getCubesMax = (arr) => arr.sort((a, b) => b - a)[0];

const main = () => {
  const games = parseInput();
  let answer = 0;
  for (const game of games) {
    const red = getCubesMax(game.red);
    const green = getCubesMax(game.green);
    const blue = getCubesMax(game.blue);
    answer += red * green * blue;
  }
  return answer;
};

answer = main();
