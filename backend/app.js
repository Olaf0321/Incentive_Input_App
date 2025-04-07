const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const classroomRoutes = require('./routes/classroomRoutes');
const staffRoutes = require('./routes/staffRoutes');

require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/classrooms', classroomRoutes);
app.use('/api/staff', staffRoutes);

module.exports = app;
