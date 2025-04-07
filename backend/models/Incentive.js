// models/Incentive.js
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['正社員用', 'パートアルバイト用'],
    required: true
  },
  unit_price: {
    type: Number,
    required: true
  },
  grade: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Incentive', staffSchema);
