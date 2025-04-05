// models/Classroom.js
const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  areaBusiness: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AreaBusiness',
    required: true
  }
});

module.exports = mongoose.model('Classroom', classroomSchema);
