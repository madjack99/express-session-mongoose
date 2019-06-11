const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    isRequired: true
  },
  text: {
    type: String,
    isRequired: true
  },
  author: {
    type: String,
    isRequired: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
