const InputPossibility = require('../models/InputPossibility');

exports.getInputPossibility = async (req, res) => {
    try {
        const period = req.params.period;
        const result = await InputPossibility.findOne({ period: period });

        if (!result) return res.status(404).json({ message: 'Incentive not found' });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Update
exports.updateInputPossibility = async (req, res) => {
    try {
        const period = req.params.period;
        const result = await InputPossibility.findOne({ period: period });

        const updated = await InputPossibility.findByIdAndUpdate(result._id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) return res.status(404).json({ message: 'Incentive not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};