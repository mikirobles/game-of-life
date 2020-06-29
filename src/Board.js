import React from "react";
import Cell from "./Cell";

function Board({ cells, onClickCell }) {
  return (
    <div className="board">
      {cells.map((_, rowIndex) => (
        <div className="col" key={`col-${rowIndex}`}>
          {cells[rowIndex].map((cell, columnIndex) => (
            <Cell
              onClick={() => onClickCell(rowIndex, columnIndex)}
              key={`row-${rowIndex}-column-${columnIndex}`}
              alive={cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
