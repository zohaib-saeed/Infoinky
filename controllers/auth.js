const express = require("express");
const jwt = require("jsonwebtoken");

exports.protect = async function (req, res, next) {
  try {
    const token = req.headers.authorization;
    // Check if the token exists
    if (!token) {
      res.status(401).json({
        status: "fail",
        message: "Access denied. No token provided",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid token provided",
        });
      }

      req.userId = decoded.userId;

      next();
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Failed to verify",
    });
  }
};
