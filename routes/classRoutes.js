const express = require('express');
const classController = require('../controllers/classController');

const router = express.Router();

// Middleware
// router.param('id', classController.checkID); //middleware that does the check for id parameter.

// Route
// Using app.route to create a instance of a single route and chain the listeners.
router
  .route('/top-3-cheap')
  .get(
    classController.aliasCheapClasses,
    classController.getAllClasses,
  );

router.route('/class-stats').get(classController.getClassStats);

router
  .route('/')
  .get(classController.getAllClasses)
  .post(classController.createClass);

router
  .route('/:id')
  .get(classController.getClass)
  .patch(classController.updateClass)
  .delete(classController.deleteClass);

module.exports = router;
