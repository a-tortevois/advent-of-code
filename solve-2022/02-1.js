// Part 1

const getRunPoints = (player1, player2) => {
  // Rock
  if (player2 === 'X') {
    // Scissors
    if (player1 === 'C') {
      return 7; // Rock defeats Scissors
    }
    // Rock
    if (player1 === 'A') {
      return 4; // draw
    }
    return 1;
  }
  // Paper
  if (player2 === 'Y') {
    // Rock
    if (player1 === 'A') {
      return 8; // Paper defeats Rock
    }
    // Paper
    if (player1 === 'B') {
      return 5; // draw
    }
    return 2;
  }
  // Scissors
  if (player2 === 'Z') {
    // Paper
    if (player1 === 'B') {
      return 9; // Scissors defeats Paper
    }
    // Scissors
    if (player1 === 'C') {
      return 6; // draw
    }
    return 3;
  }
};

let count = 0;
for (const run of input.split('\n')) {
  const [player1, player2] = run.split(' ');
  count += getRunPoints(player1, player2);
}

answer = count;
