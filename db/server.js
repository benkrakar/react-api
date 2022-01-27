const mongoose = require("mongoose");
require("dotenv").config();

const db = DATABASE_LOCAL='mongodb://localhost:27017/booking';

function databaseConnection() {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("successful connection 👨‍🦯");
    });
}
module.exports = databaseConnection;
