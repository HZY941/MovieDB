/**
 * Flatten nested array items.
 *
 * @input nested array of elements.
 * @output flattened array.
 */

const array = [1, 2, 3, [4, 5, 6, [7, 8], 9], 10];

const flatten = (array) => {
  const result = [];

  const flattenElements = (array, result) => {
    for (const item of array) {
      if (Object.prototype.toString.call(item) === "[object Array]") {
        flattenElements(item, result);
      } else {
        result.push(item);
      }
    }
  };

  flattenElements(array, result);
  return result;
};

console.log("Original Array: ", array);
console.log("Flattened: ", flatten(array));
