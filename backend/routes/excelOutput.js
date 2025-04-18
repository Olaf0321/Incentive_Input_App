// routes/excelOutput.js
const express = require('express');
const router = express.Router();
const excelOutputCtrl = require('../controllers/excelOutputController');

router.post('/', excelOutputCtrl.getDataAndTItle);

module.exports = router;
