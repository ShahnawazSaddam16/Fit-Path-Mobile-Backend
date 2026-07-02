const express = require("express");
const router = express.Router();
const {UserHistory, DeleteHistory} = require("../controllers/history");
const authMiddleware = require("../middleware/authMiddleware");
const limiter = require("../utils/limiter");

router.get("/user-history", limiter, authMiddleware, UserHistory);
router.delete("/delete-history/:id", limiter, authMiddleware, DeleteHistory);

module.exports = router;