/**
 * Remove duplicate items in given array.
 *
 * @date 05/31/2022
 * @input array with duplicate items within.
 * @output array with only unique items.
 */

const array = [1, 1, 1, 2, 3, 5, 5, 7, 8, 10];

// solution 1 - using set to remove duplicate items
const removeDuplicate = (array) => {
  const uniqueItems = new Set([...array]);
  return [...uniqueItems];
};

// solution 2 - using array includes / indexOf
const removeDuplicate_v2 = (array) => {
  const result = [];
  for (const item of array) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
};

// solution 3 - using array includes / indexOf with high order function (forEach)
const removeDuplicate_v3 = (array) => {
  const result = [];
  array.forEach((item) => {
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  });
  return result;
};

// solution 4 - using high order function (filter)
const removeDuplicate_v4 = (array) => {
  return array.filter((item, index, array) => array.indexOf(item) === index);
};

console.log("Original Array: ", array);
console.log("Solution 1 - via Set: ", removeDuplicate(array));
console.log("Solution 2 - via includes: ", removeDuplicate_v2(array));
console.log("Solution 3 - via indexOf: ", removeDuplicate_v3(array));
console.log("Solution 4 - via filter: ", removeDuplicate_v4(array));
