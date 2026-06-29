const express = require("express");
const router = express.Router();
const limiter = require("../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {CreateProfile} = require("../controllers/profile");

router.post("/create-profile", limiter, authMiddleware, CreateProfile);

module.exports = router;