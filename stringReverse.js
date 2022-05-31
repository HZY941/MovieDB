/**
 * Reverse input string.
 *
 * @input string to be reversed.
 * @output reversed string.
 */

const str = "Apple";

// solution 1 - use array built in reverse method
const reverse = (str) => {
  const result = [...str];
  return result.reverse().join("");
};

// solution 2 - swap characters within array
const reverse_v2 = (str) => {
  const result = [...str];
  for (let i = 0; i < result.length / 2; i++) {
    const temp = result[i];
    result[i] = result[result.length - 1 - i];
    result[result.length - 1 - i] = temp;
  }
  return result.join("");
};

console.log(reverse(str));
console.log(reverse_v2(str));
