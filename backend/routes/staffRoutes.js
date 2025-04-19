// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffCtrl = require('../controllers/staffController');

router.post('/', staffCtrl.createStaff);
router.post('/add_incentive', staffCtrl.addIncentive);
router.post('/incentives/period', staffCtrl.getIncentivesListByPeriod);
router.post('/incentives/month', staffCtrl.getIncentivesListByMonth);
router.post('/incentives/change', staffCtrl.changeIncentivesList);
router.post('/delete', staffCtrl.deleteIncentive);
router.get('/', staffCtrl.getAllStaff);
router.get('/:id', staffCtrl.getStaffById);
router.get('/name/:name', staffCtrl.getStaffByName);
router.put('/:id', staffCtrl.updateStaff);
router.delete('/:id', staffCtrl.deleteStaff);

module.exports = router;
