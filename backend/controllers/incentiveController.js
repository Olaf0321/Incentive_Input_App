const Incentive = require('../models/Incentive');

// CREATE
exports.createIncentive = async (req, res) => {
  try {
    const newIncentive = new Incentive(req.body);
    const saved = await newIncentive.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllIncentives = async (req, res) => {
  try {
    const incentives = await Incentive.find();
    res.json(incentives);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getIncentiveById = async (req, res) => {
  try {
    const incentive = await Incentive.findById(req.params.id);
    if (!incentive) return res.status(404).json({ message: 'Incentive not found' });
    res.json(incentive);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateIncentive = async (req, res) => {
  try {
    const updated = await Incentive.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Incentive not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteIncentive = async (req, res) => {
  try {
    const deleted = await Incentive.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Incentive not found' });
    res.json({ message: 'Incentive deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
