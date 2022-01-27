const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");

const app = express();



app.use("/hotels", routes.hotelsRouter);
app.use("/users", routes.usersRouter);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app running on ${PORT} port`);
});
