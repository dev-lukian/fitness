const mongoose = require('mongoose');
const validator = require('validator');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Give the excercise a name'],
    trim: true,
    maxlength: [100, 'Must be less than or equal to 100'],
    minlength: [3, 'Must be greater than 3'],
  },
  sets: [{
    reps: {
      type: Number,
      required: [true, 'Give the number of reps for this set'],
      max: [200, 'Must be less than or equal to 200'],
      min: [1, 'Must be greater than 1'],
    }, 
    weight: {
      type: Number,
      max: [2000, 'Must be less than or equal to 2000'],
      min: [0, 'Must be greater than 0'],
      default: null,
    }, 
    rest: {
      type: Number,
      max: [1800, 'Must be less than or equal to 2000'],
      min: [0, 'Must be greater than 0'],
      default: null,
    }, 
  }],
  muscleTarget: {
    type: String,
    required: [true, 'Give the excercise a mucsle target'],
    trim: true,
    maxlength: [100, 'Must be less than or equal to 100'],
    minlength: [2, 'Must be greater than 3'],
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
