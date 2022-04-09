const express = require('express');
const workoutController = require('../controllers/workoutController');
const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');


const router = express.Router();

// router.use(protect); //  protect all router which are comming after this middleware

router
  .route('/')
  .post(workoutController.createWorkout)

router
  .route('/:id')
  .get(workoutController.getWorkout)


module.exports = router;
