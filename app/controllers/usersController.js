const models = require("../models");
exports.getAllUsers = async (req, res, next) => {
  const users = await models.users.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};
exports.getUser = async (req, res) => {
  const user = await models.users.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
exports.createUser = async (req, res) => {
  const user = await models.users.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
exports.updateUser = async (req, res) => {
  const user = await models.users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    res.status(202).json({
      status: 404,
      message: "user not found",
    });
  }
  res.status(202).json({
    status: "success",
    data: {
      user,
    },
  });
};
exports.deleteUser = async (req, res) => {
  const user = await models.users.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  }
  res.status(202).json({
    status: "success",
    data: {
      user,
    },
  });
};
