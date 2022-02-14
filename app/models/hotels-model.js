import mongoose from 'mongoose';

const hotelsShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'categorie must have a name'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'categorie must have a name'],
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

hotelsShema.virtual("rooms", {
  ref: "Rooms",
  foreignField: "hotel",
  localField: "_id",
});


export default hotelsShema;
