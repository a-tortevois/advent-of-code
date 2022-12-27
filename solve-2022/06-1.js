// Part 1

const getFirstMarker = (datastream) => {
  for (let i = 0; i < datastream.length; i++) {
    if (new Set(datastream.slice(i, i + 4)).size === 4) {
      return i + 4;
    }
  }
};

answer = getFirstMarker(input);
