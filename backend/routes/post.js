const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authMiddleware = require("../authMiddleware");

//show all the posts
//@route api/post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      res.status(400).json({ msg: "No posts found" });
    }
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//show user's posts
//@route api/post
//@token needed
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    if (!posts) {
      res.status(400).json({ msg: "No posts found" });
    }
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Make a post
//@route api/post
//@token needed
router.post("/", authMiddleware, async (req, res) => {
  try {
    const post = new Post(req.body);
    post.user = req.user.id;
    post.name = req.user.name;
    post.avatar = req.user.avatar;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//delete a post
//@route api/post
//@token needed delete by id
router.delete("/", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.body.id, {
      useFindAndModify: false,
    });
    if (!post) {
      res.status(400).json({ msg: "Post not found!" });
    }
    res.json({ msg: "Post deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
