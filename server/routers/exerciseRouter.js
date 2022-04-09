const express = require('express');
const exerciseController = require('../controllers/exerciseController');
const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');


const router = express.Router();

// router.use(protect); //  protect all router which are comming after this middleware

router
  .route('/')
  .post(exerciseController.createExercise)

router
  .route('/:id')
  .get(exerciseController.getExercise)


module.exports = router;
