// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffCtrl = require('../controllers/staffController');

router.post('/', staffCtrl.createStaff);
router.post('/add_incentive', staffCtrl.addIncentive);
router.get('/', staffCtrl.getAllStaff);
router.get('/:id', staffCtrl.getStaffById);
router.get('/name/:name', staffCtrl.getStaffByName);
router.put('/:id', staffCtrl.updateStaff);
router.delete('/:id', staffCtrl.deleteStaff);

module.exports = router;
