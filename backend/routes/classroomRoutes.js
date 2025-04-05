// routes/classroomRoutes.js
const express = require('express');
const router = express.Router();
const classroomCtrl = require('../controllers/classroomController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

router.use(authenticateToken);
router.use(authorizeRole('admin'));

router.post('/', classroomCtrl.createClassroom);
router.get('/', classroomCtrl.getAllClassrooms);
router.put('/:id', classroomCtrl.updateClassroom);
router.delete('/:id', classroomCtrl.deleteClassroom);

module.exports = router;
