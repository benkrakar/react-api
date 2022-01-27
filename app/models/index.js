const mongoose = require("mongoose");
const usersShema = require("./users");
const hotelsShema = require("./hotels");

const models = {};
models.hotels = mongoose.model("Hotels", hotelsShema);
models.users = mongoose.model("Users", usersShema);

tesr.save()
module.exports = models;