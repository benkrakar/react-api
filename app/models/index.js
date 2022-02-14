import mongoose from 'mongoose';
import usersShema from './users-model.js';
import roomsShema from './rooms-model.js';
import hotelsShema from './hotels-model.js';
import reservationsShema from "./reservations-model.js";

const models = {};
models.rooms = mongoose.model("Rooms", roomsShema);
models.users = mongoose.model('Users', usersShema);
models.hotels = mongoose.model("Hotels", hotelsShema);
models.reservation = mongoose.model('Reservation', reservationsShema);

export default models;
