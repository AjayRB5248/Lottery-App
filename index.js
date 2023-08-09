const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const lotteryRoute = require('./routes/checkLottery');
const authRoutes = require('./routes/authRoutes');
const userHistory = require('./routes/getUserHistory');
const app = express();
require('dotenv').config({ path: './.env' });
const authenticateToken = require('./middleware/auth');

app.use(express.json());
app.use(cors());

app.use('/api/lottery', authenticateToken, lotteryRoute);
app.use('/api/user', authenticateToken, userHistory);
app.use('/api/auth', authRoutes);
const port = 3001;

const DB = process.env.MONGODB_URL;
mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/', (req, res) => {
  res.send('Server Started ...');
});
