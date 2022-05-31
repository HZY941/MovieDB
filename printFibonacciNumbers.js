/**
 * Print first n number of fibonacci numbers.
 *
 * @input number of fibonacci numbers to ebe printed.
 * @output array of fibonacci numbers.
 */

const printFibonacciNumbers = (num) => {
  if (num === 0) {
    return [0];
  } else if (num === 1) {
    return [1];
  } else if (num === 2) {
    return [1, 1];
  }

  let first = 1;
  let second = 1;
  const result = [1, 1];
  for (let i = 3; i <= num; i++) {
    result.push(first + second);
    const temp = first;
    first = second;
    second += temp;
  }
  return result;
};

console.log(printFibonacciNumbers(25));
