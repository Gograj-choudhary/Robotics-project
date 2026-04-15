import React from "react";
export default function ModeSelector({ mode, setMode }) {
  return (
    <select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="narrow">NARROW</option>
      <option value="wide">WIDE</option>
      <option value="denoise">DENOISE</option>
    </select>
  );
}