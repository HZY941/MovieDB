/**
 * Find the next warmer date from the index date.
 *
 * @date 06/08/2022
 * @input array with temperatures for each date.
 * @output array with days to the next warmer date.
 */

// solution 1 - at each date find the next warmer date.
// runtime O(n^2), space O(n).
const dailyTemperatures = (temperatures) => {
  const result = [];
  for (let i = 0; i < temperatures.length; i++) {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temperatures[i]) {
        result[i] = j - i;
        break;
      }
    }
    if (!result[i]) {
      result[i] = 0;
    }
  }
  return result;
};

// solution 2 - monotonic sort with stack to keep track of the dates.
// runtime O(n), space O(n).
// need more work.

const temp = [73, 74, 75, 71, 69, 72, 76, 73];
console.log(dailyTemperatures(temp));
