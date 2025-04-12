const Incentive = require('../models/Incentive');

// CREATE
exports.createIncentive = async (req, res) => {
  try {
    const newIncentive = new Incentive(req.body);
    console.log('newIncentive', newIncentive);
    const {name, type, unit_price, upper_limit} = newIncentive;
    const response = await Incentive.findOne({name: name, type: type});

    console.log('response', response);

    if (response != null) {
      res.status(200).json({
        code: 0,
        msg: "すでに登録されている給与項目です。"
      })
    } else {
      await Incentive.create({
        name: name,
        type: type,
        unit_price: unit_price,
        upper_limit: upper_limit
      });
      res.status(200).json({
        code: 1,
        msg: "正確に登録されました。"
      })
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllIncentives = async (req, res) => {
  try {
    const incentives = await Incentive.find();
    console.log('incentives', incentives);
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
