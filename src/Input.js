import React from "react";

function Input({ value, onChange, name }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <span style={{ marginRight: 10 }}>{name}</span>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

export default Input;
