// models/Staff.js
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    type: {
      type: String,
      enum: ['正社員', 'パートアルバイト'],
      required: true
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true
    },
    incentiveList: [
      {
        time: {
          type: Date,
          default: Date.now
        },
        incentive: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Incentive',
          required: true
        },
        grade: {
          type: Number,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Staff', staffSchema);