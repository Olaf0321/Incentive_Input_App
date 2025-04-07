// controllers/classroomController.js
const Classroom = require('../models/Classroom');

exports.createClassroom = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { name, loginId, password } = req.body;
    const newClassroom = new Classroom({ name, loginId, password });
    await newClassroom.save();
    res.status(201).json(newClassroom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOneClassroom = async (req, res) => {
  try {
    const {id} = req.params;
    const classrooms = await Classroom.findById(id);
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Classroom.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    await Classroom.findByIdAndDelete(id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
