// routes/classroomRoutes.js
const express = require('express');
const router = express.Router();
const inputPossibilityCtrl = require('../controllers/inputPossibilityController');

router.put('/:period', inputPossibilityCtrl.updateInputPossibility);

module.exports = router;
