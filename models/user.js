const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User mustt submit name"],
  },
  email: {
    type: String,
    required: [true, "User must submit email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "User must submit password"],
    minlength: 6,
  },
});

userSchema.pre("save", async function (next) {
  try {
    // Generate the salt
    const saltRounds = 12;
    // Hashing the password with generated salt
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    // Setting hashed password as new password
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw new Error("Failed to compare password");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
