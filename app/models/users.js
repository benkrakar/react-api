const validator = require("validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const usersShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name"],
    unique: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter a valid email"],
    required: [true, "user must have a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "user must have a password"],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    required: false,
    default: "user",
    enum: ["user", "admin"],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});

usersShema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

module.exports = usersShema;
