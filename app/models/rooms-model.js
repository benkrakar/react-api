import mongoose from 'mongoose';
const roomsShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'room must have a name'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'room must have a description'],
    },
    hotel: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hotels',
      required: [true, 'room must belong to a hotel'],
    },
    price: {
      type: Number,
      required: true,
    },

    room_images: [String],
    ratingsAverage: {
      type: Number,
      required: false,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

roomsShema.virtual('reviews', {
  ref: 'Reviews',
  foreignField: 'Rooms',
  localField: '_id',
});

roomsShema.pre(/^find/, function (next) {
  this.populate({
    path: "hotel",
    select: "name",
  });
  next();
});

export default roomsShema;
