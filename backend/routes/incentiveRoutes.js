// routes/classroomRoutes.js
const express = require('express');
const router = express.Router();
const incentiveCtrl = require('../controllers/incentiveController');

router.post('/', incentiveCtrl.createIncentive);
router.get('/', incentiveCtrl.getAllIncentives);
router.get('/:id', incentiveCtrl.getIncentiveById);
router.put('/:id', incentiveCtrl.updateIncentive);
router.delete('/:id', incentiveCtrl.deleteIncentive);

module.exports = router;
