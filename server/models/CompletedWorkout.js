const mongoose = require('mongoose');
const validator = require('validator');

const completedWorkoutSchema = new mongoose.Schema({
  workout: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Workout',
    required: [true, 'Must connect to a valid workout'],
  },
  completedExercises: [{
    exercise: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Exercise'
    },
    sets: {
      setNumber: {
        type: Number,
        required: [true, 'Must include a set number'],
        min: 0,
        max: 1000,
      }, 
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
    }
    
  }],
  startDate: {
    type: Date,
    required: [true, 'Must include a start date.']
  },
  endDate: {
    type: Date,
    default: null,
  },
});

const CompletedWorkout = mongoose.model('CompletedWorkout', completedWorkoutSchema);
module.exports = CompletedWorkout;
