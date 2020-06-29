export const getInitialState = (w, h, randomized) =>
  {
    let state = Array.from({ length: w }).map(() => Array.from({ length: h }));
    if (randomized) {
      state = state.map(row =>
        row.map(() => Math.random() > 0.75)
      )
    }
    return state;
  }

const isCellAlive = (w, h, cells) => (cells[w] && cells[w][h] ? 1 : 0);

export const shouldLive = (col, row, isAlive, cells) => {
  let liveNeighbours =
    isCellAlive(col - 1, row - 1, cells) +
    isCellAlive(col - 1, row, cells) +
    isCellAlive(col - 1, row + 1, cells) +
    isCellAlive(col, row - 1, cells) +
    isCellAlive(col, row + 1, cells) +
    isCellAlive(col + 1, row - 1, cells) +
    isCellAlive(col + 1, row, cells) +
    isCellAlive(col + 1, row + 1, cells);

  return isAlive
    ? liveNeighbours > 1 && liveNeighbours < 4
    : liveNeighbours === 3;
};

export function cloneCells(cells) {
  const newCells = [];

  cells.forEach((col, i) => (newCells[i] = col.slice(0)));

  return newCells;
}