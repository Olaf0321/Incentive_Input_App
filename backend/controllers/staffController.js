// controllers/staffController.js
const Staff = require('../models/Staff');

// CREATE a new staff
exports.createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    console.log("staff", staff);
    const {name, type, classroom} = staff;
    const response = await Staff.findOne({name: name});

    console.log('response', response);

    if (response != null) {
      res.status(200).json({
        code : 0,
        msg: "すでに登録されている名前です。"
      })
    } else {
      await Staff.create({
        name: name,
        type: type,
        classroom: classroom
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

// READ all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find()
      .populate('classroom')
      .populate('incentiveList.incentive');
    
    const realStaffList = staffList.filter(item=>item.name !== 'Admin');
    
    res.status(200).json(realStaffList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ one staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id)
      .populate('classroom')
      .populate('incentiveList.incentive');
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE staff
exports.updateStaff = async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedStaff) return res.status(404).json({ message: 'Staff not found' });
    res.json(updatedStaff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE staff
exports.deleteStaff = async (req, res) => {
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
    if (!deletedStaff) return res.status(404).json({ message: 'Staff not found' });
    res.json({ message: 'Staff deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};