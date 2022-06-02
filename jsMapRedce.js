/**
 * Sample usage of higher order function, map & reduce.
 *
 * @date 06/02/2022
 * @input nested array
 * @output flattened array
 */

const array = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
];

const flattenNested = (array) => {
  return array.reduce((acc, arr) => [...acc, ...arr], []);
};

console.log(flatten(array));
