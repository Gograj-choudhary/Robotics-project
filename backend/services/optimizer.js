function optimizePrompt(input, mode = "narrow") {
  
  if (mode === "wide") {
    return `A detailed cinematic scene of ${input}, ultra realistic, 4k lighting, environment rich`;
  }

  if (mode === "denoise") {
    return input.replace(/please|can you|i want|generate/gi, "").trim();
  }

  // default = narrow
  return `high quality, detailed ${input}, sharp focus, 4k, realistic`;
}

module.exports = optimizePrompt;