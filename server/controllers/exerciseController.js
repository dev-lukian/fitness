const Exercise = require('../models/Exercise');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createExercise = catchAsync(async (req, res, next) => {
  const newExercise = await Exercise.create({
    name: req.body.name,
    sets: req.body.sets,
    muscleTarget: req.body.muscleTarget,
  });

  if (!newExercise)
    return next(
      new AppError(`
      Can't create exercise due to invalid details, 400
      `)
    );

  res.status(200).json({
    status: 'success',
    exercise: newExercise,
  });
});

exports.getExercise = catchAsync(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);

  if (!exercise)
    return next(
      new AppError(`No Exercise found against id ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    exercise,
  });
});

