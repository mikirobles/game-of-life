import React, { useRef, useEffect, useMemo } from "react";

const cellSize = 10;

function drawCell(row, col, alive, ctx) {
  ctx.fillStyle = alive ? "#3fb4eb" : "#f0f0f0";
  ctx.fillRect(
    row * cellSize + 1,
    col * cellSize + 1,
    cellSize - 2,
    cellSize - 2
  );
  return ctx;
}

function Board({ cells, onClickCell }) {
  const canvasRef = useRef();

  const width = useMemo(() => {
    return cells.length;
  }, [cells]);

  const height = useMemo(() => {
    return cells[0] ? cells[0].length : 0;
  }, [cells]);

  const ctxCells = useMemo(() => {
    if (canvasRef.current) {
      return cells.map((_, rowIndex) =>
        cells[rowIndex].map((cell, columnIndex) => {
          const ctx = canvasRef.current.getContext("2d");
          return ctx;
        })
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  useEffect(() => {
    ctxCells.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) =>
        drawCell(rowIndex, colIndex, cells[rowIndex][colIndex], cell)
      )
    );
  }, [ctxCells, cells]);

  const onCanvasClick = event => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    onClickCell(col, row);
  };

  return (
    <div className="board">
      <canvas
        onClick={onCanvasClick}
        width={cells.length * cellSize}
        height={cells[0] ? cells[0].length * cellSize : 0}
        ref={canvasRef}
      />
    </div>
  );
}

export default Board;
