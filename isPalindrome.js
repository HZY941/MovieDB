/**
 * Check if a given input string is palindrome or not.
 *
 * @input input string.
 * @output booolean value that check if the string is palindrome or not.
 */

const str = "This is not";
const str_2 = "hannah";

// solution 1 - reverse the string and check if it matches the original string
const isPalindrome = (str) => {
  return str === [...str].reverse().join("");
};

console.log(`'${str}' : ${isPalindrome(str)}`);
console.log(`'${str_2}' : ${isPalindrome(str_2)}`);
