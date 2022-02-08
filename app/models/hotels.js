const mongoose = require("mongoose");

const hotelsShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "hotel must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "hotel must have a name"],
  },
  roomsNumber: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  rooms: [{
    number: {
      type: Number,
      ref: "room"
    },
      size: {
      type:String,
      ref: "room"
    },
    description:{
      type: String,
      ref:"room"
    },
    img:{ 
      data: Buffer, 
      ref: String 
   }

  }]
});

module.exports = hotelsShema;
