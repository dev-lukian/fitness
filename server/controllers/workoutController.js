const Workout = require("../models/Workout");
const CompletedWorkout = require("../models/CompletedWorkout.js");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createWorkout = catchAsync(async (req, res, next) => {
  const newWorkout = await Workout.create({
    _id: req.body._id,
    name: req.body.name,
    exerciseBlocks: req.body.exerciseBlocks,
    splitType: req.body.splitType,
    draft: req.body.draft,
  });

  if (!newWorkout)
    return next(
      new AppError(`
      Can't create workout due to invalid details, 400
      `)
    );

  res.status(200).json({
    status: "success",
    workout: newWorkout,
  });
});

exports.getWorkout = catchAsync(async (req, res, next) => {
  let workout = await Workout.findById(req.params.id);

  if (!workout)
    return next(
      new AppError(`No Workout found against id ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: "success",
    workout,
  });
});

exports.getWorkout = catchAsync(async (req, res, next) => {
  let workout = await Workout.findById(req.params.id);

  if (!workout)
    return next(
      new AppError(`No Workout found against id ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: "success",
    workout,
  });
});
