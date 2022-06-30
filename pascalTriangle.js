/**
 * LC 118 - Find the values for pascal triangle
 *
 * @date 06/29/2022
 * @input number of rows
 * @output pascal triangle
 *
 *              1
 *             1 1
 *            1 2 1
 *           1 3 3 1
 */

const pascalTriangle = (numRows) => {
  const result = [[1]];

  for (let r = 1; r < numRows; r++) {
    result.push(new Array(r + 1));
    result[r][0] = 1;
    result[r][r] = 1;
    for (let c = 1; c <= r / 2; c++) {
      result[r][c] = result[r - 1][c - 1] + result[r - 1][c];
      result[r][r - c] = result[r][c];
    }
  }
  return result;
};

console.log(pascalTriangle(5));
