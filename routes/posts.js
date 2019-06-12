const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//@route  /api/posts
//@descr  Show all posts
//@acces  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => console.log(err));
});

//@route  /api/posts/create
//@descr  Create new post
//@acces  Privat
router.post("/create", (req, res) => {
  const { title, text, author } = req.body;
  const newPost = new Post({
    title,
    text,
    author
  });
  newPost
    .save()
    .then(newPost => res.json(newPost))
    .catch(err => console.log(err));
});

//@route Delete /api/posts/delete
//@descr Delete a post
//@acces Private
router.delete("/delete", (req, res) => {
  const { id } = req.body;
  console.log(id);
  Post.findById(id)
    .then(post => post.remove().then(() => res.json({ msg: "Post removed" })))
    .catch(err => res.status(404).json({ msg: "failed to remove" }));
});

module.exports = router;
