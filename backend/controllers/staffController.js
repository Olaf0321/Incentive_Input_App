// controllers/staffController.js
const Staff = require('../models/Staff');

exports.createStaff = async (req, res) => {
  try {
    const { name, type, classroom } = req.body;
    const newStaff = new Staff({ name, type, classroom });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find().populate('classroom', 'name');
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Staff.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
