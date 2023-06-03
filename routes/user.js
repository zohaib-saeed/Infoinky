const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { protect } = require("../controllers/auth");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      status: "success",
      length: allUsers.length,
      message: {
        users: allUsers,
      },
    });
  } catch (err) {
    res.status(505).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.post("/register", async function (req, res, next) {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();

    res.status(200).json({
      status: "success",
      message: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(505).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "invalid email or password",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      message: "User authenticated successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });
  } catch (err) {
    res.status(505).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.post("/profile", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    res.status(200).json({
      stauts: "success",
      message: "User authorized",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Access denied. Invalid email or password",
    });
  }
});

module.exports = router;
