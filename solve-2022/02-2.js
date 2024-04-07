// Part 2

const getRunPoints = (player1, player2) => {
  // You need to loose
  if (player2 === 'X') {
    // Rock
    if (player1 === 'A') {
      return 3; // You choose Scissors
    }
    // Paper
    if (player1 === 'B') {
      return 1; // You choose Rock
    }
    // Scissors
    return 2; // You choose Paper
  }
  // You need to Draw
  if (player2 === 'Y') {
    // Rock
    if (player1 === 'A') {
      return 4;
    }
    // Paper
    if (player1 === 'B') {
      return 5;
    }
    // Scissors
    return 6;
  }
  // You need to win
  if (player2 === 'Z') {
    // Rock
    if (player1 === 'A') {
      return 8; // You choose Paper
    }
    // Paper
    if (player1 === 'B') {
      return 9; // You choose Scissors
    }
    // Scissors
    return 7; // You choose Rock
  }
};

let count = 0;
for (const run of input.split('\n')) {
  const [player1, player2] = run.split(' ');
  count += getRunPoints(player1, player2);
}

answer = count;
