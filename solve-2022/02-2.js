// Part 2

const getRunPoints = (player1, player2) => {
  if (player2 === 'X') { // You need to loose
    if (player1 === 'A') { // Rock
      return 3; // You choose Scissors
    } else if (player1 === 'B') { // Paper
      return 1; // You choose Rock
    } // Scissors
    return 2; // You choose Paper
  }
  if (player2 === 'Y') { // You need to Draw
    if (player1 === 'A') { // Rock
      return 4;
    } else if (player1 === 'B') { // Paper
      return 5;
    } // Scissors
    return 6;
  }
  if (player2 === 'Z') { // You need to win
    if (player1 === 'A') { // Rock
      return 8; // You choose Paper
    } else if (player1 === 'B') { // Paper
      return 9; // You choose Scissors
    } // Scissors
    return 7; // You choose Rock
  }
};

let count = 0;
for (const run of input.split('\n')) {
  const [player1, player2] = run.split(' ');
  count += getRunPoints(player1, player2);
}

answer = count;
