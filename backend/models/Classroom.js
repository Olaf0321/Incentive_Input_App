// models/Classroom.js
const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    loginId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Classroom', classroomSchema);
