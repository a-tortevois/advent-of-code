// Part 1

// return 0 => continue
// return < 0 => pairs are valid
// return > 0 => pairs are invalid
const comparePackets = (packet1, packet2) => {
  // Compare two integers
  if (typeof packet1 === 'number' && typeof packet2 === 'number') {
    return packet1 - packet2;
  }
  // Compare two arrays
  if (typeof packet1 === 'object' && typeof packet2 === 'object') {
    for (let i = 0; i < packet1.length; i++) {
      if (i >= packet2.length) {
        return 1;
      } // Right side ran out of items, so inputs are not in the right order
      const res = comparePackets(packet1[i], packet2[i]);
      if (res !== 0) {
        return res;
      }
    }
    return packet1.length - packet2.length;
  }
  // Mixed types
  return typeof packet1 === 'object' ? comparePackets(packet1, [packet2]) : comparePackets([packet1], packet2);
};

const packetPairs = input.split('\n\n').map((v) => v.split('\n').map(JSON.parse));

let count = 0;
for (let i = 0; i < packetPairs.length; i++) {
  const packet1 = packetPairs[i][0];
  const packet2 = packetPairs[i][1];
  if (comparePackets(packet1, packet2) < 0) {
    count += i + 1;
  }
}

answer = count;
