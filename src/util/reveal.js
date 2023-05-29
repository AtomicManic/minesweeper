export const reveal = (arr, x, y) => {
  // validate not revealed, in bounds and not a mine
  if (
    x < 0 ||
    y < 0 ||
    x >= arr.length ||
    y >= arr[0].length ||
    arr[x][y].revealed ||
    arr[x][y].value === "X"
  ) {
    return arr;
  }

  // reveal current cell
  if (arr[x][y].flagged) arr[x][y].flagged = false;
  arr[x][y].revealed = true;

  //   if current cell value is 0, look for adjacent cells with value 0
  if (arr[x][y].value === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // excluding current cell
        if (i !== 0 || j !== 0) {
          // continue to next cells recursively
          reveal(arr, x + i, y + j);
        }
      }
    }
  }
  return arr;
};

export const getNonMinesCount = (arr, rows, columns, mines) => {
  let nonMinesCount = 0;
  let win = false;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j].revealed && arr[i][j].value !== "X") {
        nonMinesCount++;
      }
    }
  }
  if (rows * columns - nonMinesCount - mines === 0) {
    win = true;
  }
  return { cellsRemain: rows * columns - nonMinesCount - mines, win };
};
