import React from "react";

function Cell({ alive, onClick }) {
  return <div onClick={onClick} className={`cell ${alive ? "alive" : ""}`} />;
}

export default Cell;
