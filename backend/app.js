const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const areaBusinessRoutes = require('./routes/areaBusinessRoutes');
const classroomRoutes = require('./routes/classroomRoutes');

require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/area-business', areaBusinessRoutes);
app.use('/api/classrooms', classroomRoutes);

module.exports = app;
