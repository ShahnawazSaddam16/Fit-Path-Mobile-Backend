const express = require("express");
const router = express.Router();
const limiter = require("../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {CreateProfile, userProfile, editProfile} = require("../controllers/profile");

router.post("/create-profile", limiter, upload.single("Image"), authMiddleware, CreateProfile);
router.get("/user-profile", limiter, authMiddleware, userProfile);
router.put("/edit-profile", limiter, authMiddleware, editProfile);

module.exports = router;