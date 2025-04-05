const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const auth = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

module.exports = app;
