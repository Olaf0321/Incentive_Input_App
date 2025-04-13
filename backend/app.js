const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const staffRoutes = require('./routes/staffRoutes');
const incentiveRoutes = require('./routes/incentiveRoutes');
const adminSetting = require('./config/admin');
const InputPossibilityRoutes = require('./routes/inputPossibility');

require('dotenv').config();

adminSetting.init();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/incentive', incentiveRoutes);
app.use('/api/inputPossibility', InputPossibilityRoutes);

module.exports = app;
