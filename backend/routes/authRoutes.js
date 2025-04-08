// routes/classroomRoutes.js
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

router.post('/login', authCtrl.login);

module.exports = router;
