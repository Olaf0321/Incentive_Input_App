// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffCtrl = require('../controllers/staffController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

router.use(authenticateToken);
router.use(authorizeRole('admin'));

router.post('/', staffCtrl.createStaff);
router.get('/', staffCtrl.getAllStaff);
router.put('/:id', staffCtrl.updateStaff);
router.delete('/:id', staffCtrl.deleteStaff);

module.exports = router;
