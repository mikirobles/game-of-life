import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.css";
import Board from "./Board";
import Input from "./Input";

const getInitialState = (w, h) =>
  Array.from({ length: w }).map(() => Array.from({ length: h }));

const isCellAlive = (w, h, cells) => (cells[w] && cells[w][h] ? 1 : 0);

const shouldLive = (col, row, isAlive, cells) => {
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

function cloneCells(cells) {
  const newCells = [];

  cells.forEach((col, i) => (newCells[i] = col.slice(0)));

  return newCells;
}

const statuses = {
  paused: "paused",
  active: "active"
};

export default function App() {
  const tickInterval = useRef();
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(15);
  const [cells, setCells] = useState(getInitialState(width, height));
  const [status, setStatus] = useState(statuses.paused);
  const [speed, setSpeed] = useState(50);

  const onTick = useCallback(() => {
    const newCells = cloneCells(cells).map((col, colIndex) =>
      col.map((cell, rowIndex) => shouldLive(colIndex, rowIndex, cell, cells))
    );
    setCells(newCells);
  }, [cells]);

  useEffect(() => {
    setCells(getInitialState(width, height));
  }, [width, height]);

  useEffect(() => {
    if (status === statuses.active) {
      tickInterval.current = setTimeout(onTick, speed);
    }
    return () => {
      clearTimeout(tickInterval.current);
    };
  }, [status, onTick, speed]);

  const onClickCell = (w, h) => {
    setStatus(statuses.paused);
    const newCells = cloneCells(cells);
    newCells[w][h] = !newCells[w][h];
    setCells(newCells);
  };

  const randomizeState = () => {
    const newCells = cloneCells(getInitialState(width, height)).map(row =>
      row.map(() => Math.random() > 0.75)
    );
    setCells(newCells);
  };

  const clear = () => {
    setCells(getInitialState(width, height));
  };

  return (
    <div className="App">
      <h1>Game of Life</h1>
      <Board cells={cells} onClickCell={onClickCell} />

      {/* Controls */}
      {status === statuses.paused ? (
        <div className="btn-row">
          <button onClick={() => setStatus(statuses.active)}>play</button>
          <button onClick={clear}>clear</button>
          <button onClick={randomizeState}>randomize</button>
        </div>
      ) : (
        <button onClick={() => setStatus(statuses.paused)}>pause</button>
      )}

      {/* Settings */}
      <Input name="Speed" value={speed} onChange={setSpeed} />
      <Input name="Width" value={width} onChange={setWidth} />
      <Input name="Height" value={height} onChange={setHeight} />
    </div>
  );
}
