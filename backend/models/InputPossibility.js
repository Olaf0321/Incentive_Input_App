// models/Incentive.js
const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema(
    {
        period: {
            type: String,
            enum: ['上期入力', '下期入力'],
            required: true
        },
        status: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('InputPossibility', inputSchema);
