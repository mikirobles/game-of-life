import React from "react";
import Cell from "./Cell";
import styled from "styled-components";

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  .col {
    margin-right: 2px;
  }
`;

function Board({ cells, onClickCell }) {
  return (
    <BoardWrapper rows={cells.length}>
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
    </BoardWrapper>
  );
}

export default Board;
