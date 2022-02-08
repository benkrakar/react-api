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
  console.log("getHotel");
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
  console.log("updateHotel");
};
exports.deleteHotel = async (req, res) => {
  console.log("deleteHotel");
};
