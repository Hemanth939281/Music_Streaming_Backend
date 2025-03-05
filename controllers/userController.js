const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userCtrl = {
  // Registering a new user
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name ||!email ||!password) 
        return res.status(400).json({ message: "All fields are required" });
      const existingUser = await Users.findOne({ email });

      if (password.length < 8)
        return res.status(400).json({ message: "Password should be at least 8 characters" });

      if (existingUser)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new Users({ name, email, password: hashedPassword });
      await user.save();

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/users/refreshToken",
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  // Logging in a user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/users/refreshToken",
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      });

      res.status(200).json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  // Getting a new access token using refresh token
  getRefreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];
      if (!refreshToken)
        return res.status(401).json({ message: "Unauthorized, please login" });

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Session expired, please login again" });

        const accessToken = createAccessToken({ id: user.id });
        res.json({ accessToken });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  // Logging out a user
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", {
        path: "/users/refreshToken",
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });
      res.json({ message: "Logged out successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  // Get user info
  getUserInfo: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};

// Function to create an access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
  });
};

// Function to create a refresh token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  });
};

module.exports = userCtrl;
