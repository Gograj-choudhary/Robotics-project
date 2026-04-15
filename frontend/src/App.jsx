import React, { useState } from "react";
import { generateImage } from "./api/api";
import InputBox from "./components/InputBox";
import ModeSelector from "./components/ModeSelector";
import ImageDisplay from "./components/ImageDisplay";

function App() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("narrow");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setImage("");

    try {
      const res = await generateImage(input);

      // res.data is an ArrayBuffer when responseType is "arraybuffer"
      const blob = new Blob([res.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Text to Image Generator</h1>
      <InputBox input={input} setInput={setInput} />
      <ModeSelector mode={mode} setMode={setMode} />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ImageDisplay image={image} />
    </div>
  );
}

export default App;