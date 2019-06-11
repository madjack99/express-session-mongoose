const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//@route  /api/posts
//@descr  Show all posts
//@acces  Public
router.get("/", (req, res) => {
  Post.find()
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

module.exports = router;
