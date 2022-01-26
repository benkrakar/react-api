const express = require("express");
const morgan = require("morgan");

const app = express();


app.use(morgan("dev"));
//TODO:👋 enable morgan in dev only 👋

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
