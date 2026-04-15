import React from "react";
export default function InputBox({ input, setInput }) {
  return (
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter prompt..."
    />
  );
}