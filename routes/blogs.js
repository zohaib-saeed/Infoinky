const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/", async (req, res, next) => {
  try {
    const allBlogs = await Blog.find();

    res.status(200).json({
      status: "success",
      length: allBlogs.length,
      message: {
        blogs: allBlogs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Failed to fetch blogs",
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();

    res.status(200).json({
      status: "success",
      blog: newBlog,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: {
        blog: deleteBlog,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { headline, author, uploadDate, tags, content } = req.body;

    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      {
        headline,
        author,
        uploadDate,
        tags,
        content,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: {
        blog: updateBlog,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

module.exports = router;
