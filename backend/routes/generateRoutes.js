const express = require("express");
const router = express.Router();

const { generateImageController } = require("../controllers/generateController");

router.post("/generate", generateImageController);

module.exports = router;