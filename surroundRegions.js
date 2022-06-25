/**
 * Finding the surround regions which is not surround by X's.
 *
 * Detailed info can be found via LC 130.
 *
 * @date 06/25/2022
 * @input the board representation in double array.
 * @output the output board representation in double array.
 */

const board = [
  ["X", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"],
];

const board_2 = [["X"]];

function surroundRegions(board) {
  const result = [];
  for (let r = 0; r < board.length; r++) {
    const rowArr = [];
    for (let c = 0; c < board[0].length; c++) {
      rowArr.push("X");
    }
    result.push(rowArr);
  }

  for (let c = 0; c < board[0].length; c++) {
    if (board[0][c] === "O") {
      searchSurrounding(board, 0, c, result);
    }

    if (board[board.length - 1][c] === "O") {
      searchSurrounding(board, board.length - 1, c, result);
    }
  }

  for (let r = 1; r < board.length - 1; r++) {
    if (board[r][0] === "O") {
      searchSurrounding(board, r, 0, result);
    }

    if (board[r][board[0].length - 1] === "O") {
      searchSurrounding(board, r, board[0].length - 1, result);
    }
  }

  return result;
}

function searchSurrounding(board, r, c, result) {
  if (
    r < 0 ||
    c < 0 ||
    r >= board.length ||
    c >= board[0].length ||
    board[r][c] === "X"
  ) {
    return;
  }

  board[r][c] = "X";
  result[r][c] = "O";
  searchSurrounding(board, r + 1, c, result);
  searchSurrounding(board, r - 1, c, result);
  searchSurrounding(board, r, c + 1, result);
  searchSurrounding(board, r, c - 1, result);
  return;
}

console.log("original board 1: ", board);
console.log("resulting board 1: ", surroundRegions(board));

console.log("original board 2: ", board_2);
console.log("resulting board 2: ", surroundRegions(board_2));
