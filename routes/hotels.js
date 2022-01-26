const hotelsController = require("../app/controllers/hotelsController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(hotelsController.getAllHotels)
  .post(hotelsController.createHotel);

router.route("/delete/:id").get(hotelsController.deleteHotel);
router
  .route("/update/:id")
  .get(hotelsController.getHotel)
  .post(hotelsController.updateHotel);

module.exports = router;
