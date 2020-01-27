const express = require("express");
const router = express.Router();
const app = express();
const authMiddleware = require("../authMiddleware");
const { check, validationResult } = require("express-validator");
const Profile = require("../models/Profile");

//Get all profiles
//@route /api/profile/
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find();
    if (!profiles) {
      return res.status(400).json({ msg: "Profile not exist" });
    }
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Get profile of a user
//@route /api/profile/me
// Token required
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Profile not exist" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Post profile of a  user
//@route /api/profile
//Token required
router.post(
  "/",
  [
    authMiddleware,
    check("hobbies", "Enter at least one hobby you like")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a Profile Model from req.body. Extra fields
      // in req.body are omitted.
      const profile = new Profile(req.body);

      //Add logged in user to profile
      profile.user = req.user.id;

      //Transform hobbies skills to array
      profile.hobbies = req.body.hobbies.split(",").map(hobby => hobby.trim());

      console.log(profile);

      if (req.body.skills) {
        profile.skills = req.body.skills.split(",").map(skill => skill.trim());
      }

      const new_profile = await Profile.findOneAndUpdate(
        { user: profile.user },
        profile,
        { new: true, upsert: true, useFindAndModify: false }
      );
      res.json(new_profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

//Update profile of a user
//@route /api/profile/update
//Token required
router.put("/update", authMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let body = req.body;
    // formatting skills and hobbies to array type
    if (body.skills) {
      body.skills = body.skills.split(",").map(skill => skill.trim());
    }
    if (body.hobbies) {
      body.hobbies = body.hobbies.split(",").map(hobby => hobby.trim());
    }

    const new_profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: body },
      { new: true, upsert: false, useFindAndModify: false }
    );
    res.json(new_profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Add new education
router.put(
  "/education",
  [
    authMiddleware,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Major is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // get the new experience to be added
      const edu = req.body;
      profile.education.unshift(edu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
