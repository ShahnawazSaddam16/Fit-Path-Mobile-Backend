const express = require("express");
const router = express.Router();
const {AIModel} = require("../controllers/ai-model");
const limiter = require("../utils/limiter");

router.post("/ai-model", limiter, AIModel);

module.exports = router;