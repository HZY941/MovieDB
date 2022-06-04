/**
 * Find the minumum splits to a given string to make each splits unique.
 *
 * @date 06/03/2022
 * @input string to be split
 * @output minimum number of splits
 */

const str = "test";
const str2 = "dddd";
const str3 = "cycle";

const minimumSplit = (str) => {
  const chArr = [...str];
  const seen = new Set();
  let index = 0;
  let count = 1;
  while (index < chArr.length) {
    if (seen.has(chArr[index])) {
      count++;
      seen.clear();
      continue;
    }
    seen.add(chArr[index]);
    index++;
  }

  return count;
};

console.log(minimumSplit(str));
console.log(minimumSplit(str2));
console.log(minimumSplit(str3));
