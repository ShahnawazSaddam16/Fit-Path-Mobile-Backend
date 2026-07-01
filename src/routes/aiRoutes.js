const express = require("express");
const router = express.Router();
const {AIModel} = require("../controllers/ai-model");
const limiter = require("../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/ai-model", limiter, authMiddleware ,AIModel);

module.exports = router;