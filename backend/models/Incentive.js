// models/Incentive.js
const mongoose = require('mongoose');

const incentiveSchema = new mongoose.Schema(
    {
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
        upper_limit: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Incentive', incentiveSchema);
