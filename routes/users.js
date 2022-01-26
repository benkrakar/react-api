const usersController = require('../app/controllers/usersController')
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(usersController.getAllusers)
  .post(usersController.createuser);

router.route("/delete/:id").get(usersController.deleteuser);
router
  .route("/update/:id")
  .get(usersController.getuser)
  .post(usersController.updateuser);

module.exports = router;
