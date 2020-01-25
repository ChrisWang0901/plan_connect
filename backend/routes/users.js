const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const config = require("config");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//
router.get("/", (req, res) => res.send("users routing"));

// sign up
router.post(
  "/",
  [
    check("name", "Enter a name")
      .not()
      .isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Invalid password").isLength({ min: 7 })
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "This email has been registered." });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mp"
      });
      user = new User({
        name,
        email,
        password,
        gravatar
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 600000 },
        (err, token) => {
          if (err) {
            console.error(err);
          }
          res.json(token);
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
