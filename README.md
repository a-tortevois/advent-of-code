# Advent of Code

https://adventofcode.com/

## AOC Secret

On `src` directory, create the `aoc.secret.js` file with the following content:

```bash
export const AOC_COOKIE = "PUT_YOUR_COOKIE_KEY_HERE";
```

Then exec:

```bash
$ npm run aoc YEAR DAY LEVEL
```

For exemple:

- to test your answer for AOC-2023 Day 1, Part 1:

```bash
$ npm run aoc:dev 2023 1 1
```

- to refresh input and test your answer for AOC-2023 Day 1, Part 1:

```bash
$ npm run aoc:dev 2023 1 1 no-cache
```

- to submit your answer for AOC-2023 Day 1, Part 1:

```bash
$ npm run aoc 2023 1 1
```


## Solution template

```javascript
// Part X

const parseInput = () => input.split('\n').map((line, index) => index);

const main = () => {
  const input = parseInput();
  return input.reduce((prev, acc) => (prev += acc), 0);
};

answer = main();
```
