const asyncHandler = require("express-async-handler");
const exercise = require("../models/exerciseModel");
const user = require("../models/userModel");
const { getUserDetail } = require("./userController");
const { isValidDate } = require("../middleware/validateDate");

// Adding the Exercises
const addExercise = asyncHandler(async (req, res) => {
  const exerciseObj = {
    ...req.body,
    userId: req.params._id,
    date: req.body.date || new Date().toLocaleDateString(),
  };
  const result = await user.findById(req.params._id);
  let { userId, description, duration, date } = await exercise.create(
    exerciseObj
  );
  const { username } = result;
  res.json({ _id: userId, username, description, duration, date });
});

// Getting the Exercises
const getExercises = asyncHandler(async (req, res) => {
  const { _id, username } = await getUserDetail(req.params._id);
  const exercises = await getExercise(_id);
  const filteredExercise = req.query.from
    ? await getLimitedExercise(exercises, req.query)
    : exercises;
  const result = {
    _id,
    username,
    count: filteredExercise.length,
    logs: filteredExercise,
  };
  res.json(result);
});

//Getting Exercises of the respective user
const getExercise = asyncHandler(async (id) => {
  const result = await exercise.find({ userId: id }).sort({ date: 1 });
  return result;
});

//Getting Exercises from given limit
const getLimitedExercise = asyncHandler(async (exercises, query) => {
  const isValidDateformat = await isValidDate(query);
  if (!isValidDateformat) {
    const { from, to, limit } = query;
    let startDate = from ? new Date(from) : null;
    let endDate = to ? new Date(to) : null;
    if (endDate) {
      endDate.setHours(23, 59, 59, 999);
    }
    // Filter based on range (using $gte and $lte)
    const results = exercises.filter(
      (exercise) => exercise.date >= startDate && exercise.date <= endDate
    );
    return limit ? results.slice(0, limit) : results;
  }
});

module.exports = {
  addExercise,
  getExercise,
  getExercises,
};
