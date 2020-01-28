const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const authMiddleware = require("../authMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

// Get user's info using x-auth token
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.err(error);
    res.status(500).send("Server Error");
  }
});
// Login by entering email and password
// @route /api/login
router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Please enter the password").exists()
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invaid login or password" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).josn({ error: "Invalid login or password" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 600000 },
        (err, token) => {
          if (err) {
            console.error(err);
          } else {
            res.json(token);
          }
        }
      );
    } catch (error) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
