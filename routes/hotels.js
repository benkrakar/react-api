const hotelsController = require("../app/controllers/hotelsController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(hotelsController.getAllHotels)
  .post(hotelsController.createHotel);
router
  .route("/:id")
  .get(hotelsController.getHotel)
  .patch(hotelsController.updateHotel)
  .delete(hotelsController.deleteHotel);

module.exports = router;
