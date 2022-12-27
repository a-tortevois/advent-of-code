// Part 2

const getFirstMarker = (datastream) => {
  for (let i = 0; i < datastream.length; i++) {
    if (new Set(datastream.slice(i, i + 14)).size === 14) {
      return i + 14;
    }
  }
};

answer = getFirstMarker(input);
