import validator from 'validator';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const usersShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'user must have a name'],
    unique: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Please enter a valid email'],
    required: [true, 'user must have a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'user must have a password'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    required: false,
    default: 'user',
    enum: ['user', 'admin','owner'],
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
  user_image: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

usersShema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

usersShema.pre(/^find/, async function (next) {
  this.find({ active: { $ne: false } });
  next();
});

export default usersShema;
