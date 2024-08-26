const express = require("express");
const authenticate = require("../middleware/auth");
const {
  login,
  logout,
  getSession,
  addUser,
  VerifyUser,
  resendOtp,
} = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.delete("/logout", logout);
router.get("/session", authenticate, getSession);
router.post("/register", addUser);
router.post("/verify", VerifyUser);
router.post("/resend", resendOtp);

module.exports = router;
