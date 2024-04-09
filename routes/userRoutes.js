const express = require("express");
const { addUser, getUserDetails } = require("../controllers/userController");
const router = express.Router();

router.route("/").get(getUserDetails).post(addUser);

module.exports = router;
