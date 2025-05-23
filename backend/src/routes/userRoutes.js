const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserData,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:username", auth.verifyToken, getUserData);

module.exports = router;
