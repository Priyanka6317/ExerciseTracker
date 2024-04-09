const asyncHandler = require("express-async-handler");
const exercise = require("../models/exerciseModel");
const user = require("../models/userModel");

// Adding the Exercises
const addExercise = asyncHandler(async (req, res) => {
  const exerciseObj = {
    ...req.body,
    userId: req.params._id,
    date: req.body.date || new Date().toLocaleDateString(),
  };
  const { username } = await user.findById(req.params._id);
  let { userId, description, duration, date } = await exercise.create(
    exerciseObj
  );
  res.json({ _id: userId, username, description, duration, date });
});

// Getting the Exercises
const getExercises = asyncHandler(async (req, res) => {
  const { _id, username } = await user.findById(req.params._id);
  const exercises = await exercise.find({});
  const filteredExercise = req?.query?.from
    ? await getLimitedExercises(req, exercises)
    : await getAllExercises(_id, exercises);
  const result = {
    _id,
    username,
    count: filteredExercise.length,
    logs: filteredExercise,
  };
  res.json(result);
});

//Getting Exercises of the respective user
const getAllExercises = async (id, exercises) => {
  const filteredExercise = exercises.filter((obj) => obj.userId === id);
  return filteredExercise;
};

//Getting Exercises from given limit
const getLimitedExercises = async (req, exercises) => {
  const from = req?.query?.from
    ? new Date(req?.query?.from).toLocaleDateString()
    : null;
  const to = req.query.to ? new Date(req.query.to).toLocaleDateString() : null;

  // Validate 'limit' parameter (if provided)
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
  if (limit !== null && isNaN(limit)) {
    throw new Error("Invalid limit parameter: must be a number");
  }
  const filteredExercises = exercises.filter((currExercise) => {
    if (!from || !to || !(from instanceof Date) || !(to instanceof Date)) {
      return false;
    }
    return currExercise.date >= from && currExercise.date <= to;
  });
  return limit ? filteredExercises.slice(0, limit) : filteredExercises;
};

module.exports = {
  addExercise,
  getExercises,
  getAllExercises,
  getLimitedExercises,
};
