// routes/areaBusinessRoutes.js
const express = require('express');
const router = express.Router();
const areaCtrl = require('../controllers/areaBusinessController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

router.use(authenticateToken);
router.use(authorizeRole('admin'));

router.post('/', areaCtrl.createAreaBusiness);
router.get('/', areaCtrl.getAllAreaBusinesses);
router.put('/:id', areaCtrl.updateAreaBusiness);
router.delete('/:id', areaCtrl.deleteAreaBusiness);

module.exports = router;
