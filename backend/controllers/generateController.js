const { generateImage } = require("../services/imageService");

exports.generateImageController = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const { data, modelUsed } = await generateImage(prompt);

    console.log(`Image generated using: ${modelUsed}`);

    res.set("Content-Type", "image/png");
    res.send(data);
  } catch (error) {
    console.error("CONTROLLER ERROR:", error.message);
    res.status(500).json({ message: "Error generating image" });
  }
};