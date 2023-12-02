// Part 1

const CUBES = {
  red: 12,
  green: 13,
  blue: 14
};

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

const isPossibleGame = (game) => game.red.every((elem) => elem <= CUBES.red) && game.green.every((elem) => elem <= CUBES.green) && game.blue.every((elem) => elem <= CUBES.blue);

const main = () => {
  const games = parseInput();
  return games.filter(isPossibleGame).reduce((prev, curr) => (prev += curr.id), 0);
};

answer = main();
