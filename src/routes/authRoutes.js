const express = require("express");
const router = express.Router();
const limiter = require("../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const {SignUp, Login, Logout, Me} = require("../controllers/auth");

router.post("/signup", limiter, SignUp);
router.post("/login", limiter, Login);
router.post("/logout", limiter, authMiddleware, Logout);
router.get("/Me", limiter, authMiddleware, Me);

module.exports = router;