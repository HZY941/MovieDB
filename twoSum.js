/**
 * Two sum - finding the two number added to target number.
 *
 * @date 06/06/2022
 * @input input numbers array and target number.
 * @output the index of the two number added to target number.
 */

const array = [1, 2, 13, 4, 5, 26, 7, 18, 49];

const twoSum = (array, target) => {
  const seen = new Map();
  for (let i = 0; i < array.length; i++) {
    const comp = target - array[i];
    if (seen.has(comp)) {
      return [seen.get(comp), i];
    } else {
      seen.set(array[i], i);
    }
  }
  return [];
};

console.log(twoSum(array, 50));
console.log(twoSum(array, 1));
