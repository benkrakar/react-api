const express = require("express");
const res = require("express/lib/response");
const hotelModel = require("../model/hotel");
const app = express();


const getAllHotels = async (request, response) => {
    const hotels = await hotelModel.find({});
    try {
      response.send(hotels);
    } catch (error) {
      response.status(500).send(error);
    }
  };

const addHotels = async (request, response) => {
    const hotel = await hotelModel.create({
    name : request.body.name,
    description : request.body.description,
    // image_cover : request.body.image_cover,
    // images: request.body.images,
    stars : request.body.stars,
    status : request.body.status,
    // user_id : request.body.user_id
    });
    try {
      response.send(hotel);
    } catch (error) {
      response.status(500).send(error);
    }
  };


const updateHotel = async (request, response) => {
  const hotel = await hotelModel.findByIdAndUpdate({ _id: request.params.id},{
    name : request.body.name,
    description : request.body.description,
    // image_cover : request.body.image_cover,
    // images: request.body.images,
    stars : request.body.stars,
    status : request.body.status,
    // user_id : request.body.user_id
    },{returnDocument: 'after'});
  try {
    response.send(hotel);
  } catch (error) {
    response.status(500).send(error);
  }
};



const deleteHotel =  async (request, response) => {
    try {
      const hotels = await hotelModel.findByIdAndDelete(request.params.id);
  
      if (!hotels) response.status(404).send("No item found");
      response.status(200).send();
    } catch (error) {
      response.status(500).send(error);
    }
  };
  module.exports = {
      getAllHotels,
      addHotels,
      // getUpdateHotel,
      updateHotel,

      deleteHotel
  };
  