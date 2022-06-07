/**
 * Calculate number of island in the given grid.
 *
 * @date 06/06/2022
 * @input 2D array grid containing all the info, 1 is land 0 is water.
 * @output number of island on the given grid map.
 */

const grid = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];

const numberOfIsland = (grid) => {
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "1") {
        checkSurrounding(r, c, grid);
        count++;
      }
    }
  }

  function checkSurrounding(r, c, grid) {
    if (
      r < 0 ||
      c < 0 ||
      r >= grid.length ||
      c >= grid[0].length ||
      grid[r][c] === "0"
    ) {
      return;
    }

    grid[r][c] = "0";
    checkSurrounding(r - 1, c, grid);
    checkSurrounding(r + 1, c, grid);
    checkSurrounding(r, c - 1, grid);
    checkSurrounding(r, c + 1, grid);
    return;
  }
  return count;
};

console.log(numberOfIsland(grid));
