// routes/classroomRoutes.js
const express = require('express');
const router = express.Router();
const classroomCtrl = require('../controllers/classroomController');

router.post('/', classroomCtrl.createClassroom);
router.get('/', classroomCtrl.getAllClassrooms);
router.get('/:id', classroomCtrl.getOneClassroom);
router.put('/:id', classroomCtrl.updateClassroom);
router.delete('/:id', classroomCtrl.deleteClassroom);

module.exports = router;
