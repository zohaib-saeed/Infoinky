const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  headline: {
    type: String,
    required: [true, "Blog must have a headline"],
  },
  author: {
    type: String,
    required: [true, "Blog must have author"],
  },
  uploadDate: {
    type: Date,
    default: Date.now,
    required: [true, "Blog must have upload date."],
  },
  tags: {
    type: [String],
    required: [true, "Blog must have relavent tags"],
  },
  content: {
    type: String,
    required: [true, "Blog must have content"],
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
