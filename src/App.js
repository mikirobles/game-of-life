import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.css";
import Board from "./Board";
import Input from "./Input";
import { shouldLive, cloneCells, getInitialState } from "./helpers";

const statuses = {
  paused: "paused",
  active: "active"
};

export default function App() {
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(15);
  const [cells, setCells] = useState([]);
  const [status, setStatus] = useState(statuses.paused);
  const [speed, setSpeed] = useState(50);

  const onTick = useCallback(() => {
    const newCells = cloneCells(cells).map((col, colIndex) =>
      col.map((cell, rowIndex) => shouldLive(colIndex, rowIndex, cell, cells))
    );
    setCells(newCells);
  }, [cells]);

  useEffect(() => {
    setCells(getInitialState(width, height, true));
  }, [width, height]);

  useEffect(() => {
    let tickInterval;
    if (status === statuses.active) {
      tickInterval = setTimeout(onTick, speed);
    }
    return () => {
      if (tickInterval) {
        clearTimeout(tickInterval);
      }
    };
  }, [status, onTick, speed]);

  const onClickCell = (w, h) => {
    setStatus(statuses.paused);
    const newCells = cloneCells(cells);
    newCells[w][h] = !newCells[w][h];
    setCells(newCells);
  };

  const randomizeState = () => {
    setCells(getInitialState(width, height, true));
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
          <button
            className="primary"
            onClick={() => setStatus(statuses.active)}
          >
            > play
          </button>
          <button onClick={clear}>clear</button>
          <button onClick={randomizeState}>randomize</button>
        </div>
      ) : (
        <button className="primary" onClick={() => setStatus(statuses.paused)}>
          pause
        </button>
      )}

      {/* Settings */}
      <div className="settings">
        <Input name="Speed" value={speed} onChange={setSpeed} />
        <Input name="Width" value={width} onChange={setWidth} />
        <Input name="Height" value={height} onChange={setHeight} />
      </div>
    </div>
  );
}
