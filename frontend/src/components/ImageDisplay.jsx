import React from "react";
export default function ImageDisplay({ image }) {
  if (!image) return null;

  return (
    <img
      src={image}
      alt="Generated"
      width="400"
    />
  );
}