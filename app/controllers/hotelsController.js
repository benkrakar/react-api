const models = require("../models");
exports.getAllHotels = async (req, res, next) => {
  const hotels = await models.hotels.find();
  res.status(200).json({
    status: "success",
    results: hotels.length,
    data: {
      hotels,
    },
  });
};
exports.getHotel = async (req, res) => {
  const hotel = await models.hotels.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      hotel,
    },
  });
};
exports.createHotel = async (req, res) => {
  const hotels = await models.hotels.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      hotels,
    },
  });
};
exports.updateHotel = async (req, res) => {
  const hotel = await models.hotels.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!hotel) {
    res.status(202).json({
      status: 404,
      message: "hotel not found",
    });
  }
  res.status(202).json({
    status: "success",
    data: {
      hotel,
    },
  });
};
exports.deleteHotel = async (req, res) => {
  console.log("deleteHotel");
};
