// controllers/areaBusinessController.js
const AreaBusiness = require('../models/AreaBusiness');

exports.createAreaBusiness = async (req, res) => {
  try {
    const { name } = req.body;
    const newItem = new AreaBusiness({ name });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllAreaBusinesses = async (req, res) => {
  try {
    const items = await AreaBusiness.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAreaBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await AreaBusiness.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAreaBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    await AreaBusiness.findByIdAndDelete(id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
