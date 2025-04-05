const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const auth = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const areaBusinessRoutes = require('./routes/areaBusinessRoutes');

require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/area-business', areaBusinessRoutes);

module.exports = app;
