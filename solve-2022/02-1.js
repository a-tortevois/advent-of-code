// Part 1

const getRunPoints = (player1, player2) => {
  if (player2 === 'X') { // Rock
    if (player1 === 'C') { // Scissors
      return 7; // Rock defeats Scissors
    } else if (player1 === 'A') { // Rock
      return 4; // draw
    }
    return 1;
  }
  if (player2 === 'Y') { // Paper
    if (player1 === 'A') { // Rock
      return 8; // Paper defeats Rock
    } else if (player1 === 'B') { // Paper
      return 5; // draw
    }
    return 2;
  }
  if (player2 === 'Z') { // Scissors
    if (player1 === 'B') { // Paper
      return 9; // Scissors defeats Paper
    } else if (player1 === 'C') { // Scissors
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
