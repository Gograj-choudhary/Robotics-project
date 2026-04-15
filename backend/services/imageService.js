const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);

// Models tried in order — SDK handles provider routing automatically
const MODELS = [
  { name: "FLUX.1-schnell", id: "black-forest-labs/FLUX.1-schnell" },
  { name: "FLUX.1-dev",     id: "black-forest-labs/FLUX.1-dev"     },
  { name: "SD 2",           id: "stabilityai/stable-diffusion-2"   },
];

const generateImage = async (prompt) => {
  let lastError = null;

  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model.name}`);

      // Returns a Blob — SDK handles provider selection internally
      const blob = await client.textToImage({
        model: model.id,
        inputs: prompt,
        parameters: {
          num_inference_steps: 4,   // fast for schnell
          guidance_scale: 3.5,
        },
      });

      const arrayBuffer = await blob.arrayBuffer();
      const data = Buffer.from(arrayBuffer);

      console.log(`Success with: ${model.name}`);
      return { data, modelUsed: model.name };

    } catch (error) {
      console.error(`Failed [${model.name}]:`, error.message);
      lastError = error.message;
    }
  }

  throw new Error(`All models failed. Last error: ${lastError}`);
};

module.exports = { generateImage };