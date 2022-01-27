const mongoose = require("mongoose");

const hotelsShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "user must have a name"],
  },
  roomsNumber: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = hotelsShema;
