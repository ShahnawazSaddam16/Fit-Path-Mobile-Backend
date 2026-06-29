const express = require("express");
const router = express.Router();
const limiter = require("../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {CreateProfile} = require("../controllers/profile");

router.post("/create-profile", limiter, upload.single("Image"), authMiddleware, CreateProfile);

module.exports = router;