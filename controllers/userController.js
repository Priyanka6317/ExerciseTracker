const asyncHandler = require("express-async-handler");
const user = require("../models/userModel");

//Add the user
const addUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const result = await user.create({ username });
  res.json(result);
});

//Returns All the user details
const getUserDetails = asyncHandler(async (req, res) => {
  const users = await user.find({});
  res.json(users);
});

module.exports = { getUserDetails, addUser };
