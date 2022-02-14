import mongoose from 'mongoose';
import Models from './index.js';

const resirvationShema = new mongoose.Schema(
  {
    reservation: {
      type: String,
      required: [true, 'reservation can not be empty'],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: 'Room',
      required: [true, 'reservation must belong to a room'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'Users',
      required: [true, 'reservation must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

resirvationShema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});







export default resirvationShema;
