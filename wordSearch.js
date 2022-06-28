const board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];
const word = "ABCCED";

function wordSearch(board, word) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (board[r][c] === word.charAt(0)) {
        if (expandedSearch(board, r, c, word, 0)) {
          return true;
        }
      }
    }
  }
  return false;
}

function expandedSearch(board, r, c, word, index) {
  if (index === word.length) {
    return true;
  }

  if (
    r < 0 ||
    c < 0 ||
    r >= board.length ||
    c >= board[0].length ||
    board[r][c] === "0" ||
    word.charAt(index) !== board[r][c]
  ) {
    return false;
  }

  const temp = board[r][c];
  board[r][c] = "0";
  index++;

  const up = expandedSearch(board, r - 1, c, word, index);
  const down = expandedSearch(board, r + 1, c, word, index);
  const left = expandedSearch(board, r, c - 1, word, index);
  const right = expandedSearch(board, r, c + 1, word, index);

  if (up || down || left || right) {
    return true;
  }

  board[r][c] = temp;
  return false;
}
console.log(wordSearch(board, word));
