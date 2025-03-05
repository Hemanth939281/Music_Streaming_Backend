const express = require("express");
const userCtrl = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// Register a new user
router.post("/register", userCtrl.register);

// Login a user
router.post("/login", userCtrl.login);

// Get a new access token using refresh token
router.get("/refreshToken", userCtrl.getRefreshToken);

// Logout a user
router.post("/logout", userCtrl.logout);

// Get user info
router.get("/info", auth, userCtrl.getUserInfo);

module.exports = router;