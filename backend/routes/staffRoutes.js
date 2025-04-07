// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffCtrl = require('../controllers/staffController');

router.post('/', staffCtrl.createStaff);
router.get('/', staffCtrl.getAllStaff);
router.put('/:id', staffCtrl.updateStaff);
router.delete('/:id', staffCtrl.deleteStaff);

module.exports = router;
