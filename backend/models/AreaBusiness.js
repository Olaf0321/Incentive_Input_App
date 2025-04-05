// models/AreaBusiness.js
const mongoose = require('mongoose');

const areaBusinessSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('AreaBusiness', areaBusinessSchema);
