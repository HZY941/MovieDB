/**
 * Check if a given input string is palindrome or not.
 *
 * @date 05/31/2022
 * @input input string.
 * @output booolean value that check if the string is palindrome or not.
 */

const str = "This is not";
const str_2 = "hannah";

// solution 1 - reverse the string and check if it matches the original string
const isPalindrome = (str) => {
  return str === [...str].reverse().join("");
};

// solution 2 - check for half of the array with the other half
const isPalindrome_v2 = (str) => {
  const arr = [...str];
  for (let i = 0; i < arr.length / 2; i++) {
    if (arr[i] !== arr[arr.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

console.log(`'${str}' : ${isPalindrome(str)}`);
console.log(`'${str_2}' : ${isPalindrome(str_2)}`);
console.log(`V2: '${str}' : ${isPalindrome_v2(str)}`);
console.log(`V2: '${str_2}' : ${isPalindrome_v2(str_2)}`);
